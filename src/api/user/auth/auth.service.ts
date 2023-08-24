import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  //Registers a user
  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password, isAdmin }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const decoded_id = this.helper.validateUser;
    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.isAdmin = isAdmin;
    //console.log(isAdmin);

    return this.repository.save(user);
  }

  //Login a user
  public async login(body: LoginDto): Promise<{ userId: number; name: string; email: string; token: string; message: string }> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    const token: string = this.helper.generateToken(user);

    const response: { userId: number; name: string; email: string; token: string; message: string } = {
      userId: user.id,
      name: user.name,
      email: user.email,
      token: token,
      message: 'User logged in succesfully',
    };
    return response;
  }

  //Refreshes the user only if he is authenticated
  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.repository.findOne(id);
  }
}

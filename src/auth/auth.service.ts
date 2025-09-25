import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './../user/user.service';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from './constants/user-error.constant';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException(USER_ALREADY_EXISTS);

    const newUser = await this.userService.create(dto);
    const tokens = this.issueTokens(newUser.id);

    return { newUser, ...tokens };
  }

  issueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }
}

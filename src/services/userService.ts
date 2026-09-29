import { UserRepository, type CreateUserInput } from '../repositories/userRepository.ts';

export class UserService {
  constructor(private userRepository: UserRepository = new UserRepository()) {}

  getAllUsers() {
    return this.userRepository.findAll();
  }

  createUser(input: CreateUserInput) {
    return this.userRepository.create(input);
  }
}
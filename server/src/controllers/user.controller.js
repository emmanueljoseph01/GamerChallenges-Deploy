import { baseController } from './base.controller.js';
import { User } from '../models/index.model.js';

export const UserController = baseController(User);

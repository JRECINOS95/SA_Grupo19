import { Ability } from '@casl/ability';
import { initialAbility } from './config';

const existingAbility = [
  {
    action: 'manage',
    subject: 'all',
  },
];

export default new Ability(existingAbility || initialAbility);

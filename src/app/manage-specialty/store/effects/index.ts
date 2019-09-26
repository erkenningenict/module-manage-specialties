import { ListsEffects } from './lists.effects';
import { ManageSpecialtyEffects } from './manage-specialty.effects';
import { SkillsEffects } from './skills.effects';

export const effects: any[] = [
  ListsEffects,
  ManageSpecialtyEffects,
  SkillsEffects,
];

export * from './manage-specialty.effects';
export * from './lists.effects';
export * from './skills.effects';

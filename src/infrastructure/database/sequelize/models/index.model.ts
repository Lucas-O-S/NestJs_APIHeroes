import { Heroes } from './heroes.model';
import { Studio } from './studio.model';
import { Team } from './equipes.model';
import { User } from './user.model';
import { Role } from './roles.model';
import { Curiosities } from './curiosities.model';
import { Article } from './article.model';
import { Quiz } from './quiz.model';

export { Heroes, Studio, Team, User, Role, Quiz }; 

export const models = [Heroes, Studio, Team, User, Role,Curiosities, Article, Quiz]; 

export function defineAssociations() {
  Heroes.belongsTo(Studio, { foreignKey: 'studioId', as: 'studio' });
  Studio.hasMany(Heroes, { foreignKey: 'studioId', as: 'heroisStudio' });

  Heroes.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });
  Team.hasMany(Heroes, { foreignKey: 'team_id', as: 'heroisTeam' });
}

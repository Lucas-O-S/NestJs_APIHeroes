import { Heroes } from './heroes.model';
import { Studio } from './studio.model';
import { Team } from './equipes.model';
import { User } from './user.model';

export { Heroes, Studio, Team, User }; 

export const models = [Heroes, Studio, Team, User]; 

export function defineAssociations() {
  Heroes.belongsTo(Studio, { foreignKey: 'studioId', as: 'studio' });
  Studio.hasMany(Heroes, { foreignKey: 'studioId', as: 'heroisStudio' });

  Heroes.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });
  Team.hasMany(Heroes, { foreignKey: 'team_id', as: 'heroisTeam' });
}

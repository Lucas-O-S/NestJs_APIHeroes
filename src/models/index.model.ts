import { Heroes } from './heroes.model';
import { Editora } from './studio.model';
import { Team } from './equipes.model';
import { Moralidades } from './moralidades.model';
import { Origens } from './origem.model';
import { Sexo } from './sexo.model';

export { Heroes, Editora, Origens, Sexo, Moralidades, Team as Equipe };

export const models = [Heroes, Editora, Origens, Sexo, Moralidades, Team];

export function defineAssociations() {
    Heroes.belongsTo(Editora, { foreignKey: 'editoraId', as: 'editora' });
    Editora.hasMany(Heroes, { foreignKey: 'editoraId', as: 'heroisEditora' });

    Heroes.belongsTo(Team, { foreignKey: 'equipeId', as: 'equipe' });
    Team.hasMany(Heroes, { foreignKey: 'equipeId', as: 'heroisEquipe' });

    Heroes.belongsTo(Moralidades, { foreignKey: 'moralidadeId', as: 'moralidade' });
    Moralidades.hasMany(Heroes, { foreignKey: 'moralidadeId', as: 'heroesMoralidades' });

    Heroes.belongsTo(Origens, { foreignKey: 'origensId', as: 'origens' });
    Origens.hasMany(Heroes, { foreignKey: 'origensId', as: 'heroesOrigens' });

    Heroes.belongsTo(Sexo, { foreignKey: 'sexoId', as: 'sexo' });
    Sexo.hasMany(Heroes, { foreignKey: 'sexoId', as: 'heroesSexo' });
}

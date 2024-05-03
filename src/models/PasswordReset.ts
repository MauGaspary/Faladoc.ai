import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

export class PasswordReset extends Model {
    public id!: string;
    public user_id!: string;
    public token!: string;
    public created_at!: Date;
    public expiration_date!: Date;
}

PasswordReset.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'password_resets',
    modelName: 'PasswordReset',
    timestamps: false,
});

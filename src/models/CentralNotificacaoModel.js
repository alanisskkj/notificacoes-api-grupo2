const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CentralNotificacao = sequelize.define(
    "CentralNotificacao",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        canal: {
            type: DataTypes.ENUM("PUSH", "EMAIL"),
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Título é obrigatório" },
            },
        },
        texto: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Texto é obrigatório" },
            },
        },
        lida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        hora: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "central_notificacoes",
        timestamps: false,
    },
);

module.exports = CentralNotificacao;

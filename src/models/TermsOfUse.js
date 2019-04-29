/**
 * The TermsOfUse model.
 */

module.exports = (sequelize, DataTypes) => {
  const TermsOfUse = sequelize.define('TermsOfUse', {
    id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    text: { type: DataTypes.TEXT, allowNull: true },
    typeId: { type: DataTypes.BIGINT, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: true },
    agreeabilityTypeId: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 3 },
    created: { type: DataTypes.DATE, allowNull: false },
    updated: { type: DataTypes.DATE, allowNull: true }
  }, {
    schema: 'termsdb',
    tableName: 'TermsOfUse',
    timestamps: false
  })

  TermsOfUse.associate = (models) => {
    TermsOfUse.belongsTo(models.TermsOfUseAgreeabilityType, { foreignKey: 'agreeabilityTypeId' })
    TermsOfUse.hasOne(models.TermsOfUseDocusignTemplateXref, { foreignKey: 'termsOfUseId' })
    TermsOfUse.hasMany(models.UserTermsOfUseXref, { foreignKey: 'termsOfUseId' })
  }

  return TermsOfUse
}

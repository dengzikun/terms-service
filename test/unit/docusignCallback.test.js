/**
 * Unit test of DocusignService - Docusign Callback.
 */

const config = require('config')
const should = require('should')
const service = require('../../src/services/DocusignService')
const models = require('../../src/models')
const { user } = require('../common/testData')
const { assertError, assertErrorMessage, assertWarnMessage, assertInfoMessage, clearLogs } = require('../common/testHelper')

const DocusignEnvelope = models.DocusignEnvelope
const TermsOfUse = models.TermsOfUse

module.exports = describe('docusign Callback', () => {
  beforeEach(() => {
    clearLogs()
  })

  it('docusign Callback(AFFIDAVIT) success', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.AFFIDAVIT_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.AFFIDAVIT_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
  })

  it('docusign Callback(NDA) success', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.NDA_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.NDA_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
  })

  it('docusign Callback(W8BEN) success', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.W8BEN_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.W8BEN_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
  })

  it('docusign Callback(W9) success', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.W9TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.W9TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
  })

  it('docusign Callback(ASSIGNMENT) success', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user4.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
  })

  it('docusign Callback(ASSIGNMENT) by user 2 ban', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user2.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user2.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
    assertErrorMessage(`User with id: ${user.user2.userId} is not allowed to accept terms of use with id: ${config.DOCUSIGN.ASSIGNMENT_TERMS_OF_USE_ID}`)
  })

  it('docusign Callback(ASSIGNMENT) by user 3 already accepted', async () => {
    let docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user3.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID, isCompleted: 0 },
      raw: true
    })
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: docuEnvelope.id,
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    docuEnvelope = await DocusignEnvelope.findOne({
      where: { userId: user.user3.userId, docusignTemplateId: config.DOCUSIGN.ASSIGNMENT_V2_TEMPLATE_ID },
      raw: true
    })
    should.equal(result.message, 'success')
    should.equal(docuEnvelope.isCompleted, 1)
    assertWarnMessage(`User with id: ${user.user3.userId} has already accepted terms of use with id: ${config.DOCUSIGN.ASSIGNMENT_TERMS_OF_USE_ID}`)
  })

  it('failure - Terms of Use not found', async () => {
    try {
      const termsOfUse = await TermsOfUse.findOne({ id: config.DOCUSIGN.ASSIGNMENT_TERMS_OF_USE_ID })
      await termsOfUse.destroy()

      await service.docusignCallback({
        envelopeStatus: 'Completed',
        envelopeId: 'test-fail-id',
        tabs: [],
        connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
      })
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'InternalServerError')
      assertError(err, `Unable to process terms of use. The reason is: No terms of use exists for id: ${config.DOCUSIGN.ASSIGNMENT_TERMS_OF_USE_ID}. Try again later.`)
    }
  })

  it('failure - Connect Key is invalid', async () => {
    try {
      await service.docusignCallback({
        envelopeStatus: 'Completed',
        envelopeId: 'test-id',
        tabs: [],
        connectKey: 'invalid'
      })
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.name, 'NotFoundError')
      assertError(err, 'Connect Key is missing or invalid.')
    }
  })

  it('Ignore - Status is not completed.', async () => {
    const result = await service.docusignCallback({
      envelopeStatus: 'Uncompleted',
      envelopeId: 'test-id',
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    should.equal(result.message, 'success')
    assertInfoMessage(`Status is not completed.`)
  })

  it('Ignore - envelopeId is empty', async () => {
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: '    ',
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    should.equal(result.message, 'success')
    assertErrorMessage(`envelopeId is null or empty`)
  })

  it('Ignore - no envelope found', async () => {
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: 'not-found',
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    should.equal(result.message, 'success')
    assertErrorMessage(`No enevelope with id: not-found was found.`)
  })

  it('Ignore - no envelope found', async () => {
    const result = await service.docusignCallback({
      envelopeStatus: 'Completed',
      envelopeId: 'no-template-found',
      tabs: [],
      connectKey: config.DOCUSIGN.CALLBACK_CONNECT_KEY
    })
    should.equal(result.message, 'success')
    assertWarnMessage(`No Template was found for template id: 12345678`)
  })
})

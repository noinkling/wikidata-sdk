const should = require('should')
const { simplifyQualifier, simplifyPropertyQualifiers, simplifyQualifiers } = require('../lib/helpers/simplify_claims')
const Q2112 = require('./data/Q2112.json')
const Q19180293 = require('./data/Q19180293.json')

describe('simplifyQualifier', function () {
  it('should simplify a qualifier', done => {
    const qualifier = Q2112.claims.P190[1].qualifiers.P580[0]
    const simplified = simplifyQualifier(qualifier)
    simplified.should.equal('1953-01-01T00:00:00.000Z')
    done()
  })

  describe('empty values', function () {
    it('should return the desired novalueValue', function (done) {
      const noValueQualifier = Q19180293.claims.P1433[0].qualifiers.P1100[0]
      should(simplifyQualifier(noValueQualifier)).not.be.ok()
      simplifyQualifier(noValueQualifier, { novalueValue: '-' }).should.equal('-')
      simplifyQualifier(noValueQualifier, { novalueValue: '' }).should.equal('')
      done()
    })

    it('should return the desired somevalueValue', function (done) {
      const someValueQualifier = Q19180293.claims.P1433[0].qualifiers.P156[0]
      should(simplifyQualifier(someValueQualifier)).not.be.ok()
      simplifyQualifier(someValueQualifier, { somevalueValue: '?' }).should.equal('?')
      simplifyQualifier(someValueQualifier, { somevalueValue: '' }).should.equal('')
      done()
    })

    it('should accept null as a possible value', function (done) {
      const noValueQualifier = Q19180293.claims.P1433[0].qualifiers.P1100[0]
      should(simplifyQualifier(noValueQualifier, { novalueValue: null }) === null).be.true()
      done()
    })
  })
})

describe('simplifyPropertyQualifiers', function () {
  it('should simplify propertyQualifiers', done => {
    const propertyQualifiers = Q2112.claims.P190[1].qualifiers.P580
    const simplified = simplifyPropertyQualifiers(propertyQualifiers)
    simplified.should.deepEqual([ '1953-01-01T00:00:00.000Z' ])
    done()
  })

  describe('empty values', function () {
    it('should return the desired novalueValue', function (done) {
      const propQualifiers = Q19180293.claims.P1433[0].qualifiers.P1100
      simplifyPropertyQualifiers(propQualifiers, { novalueValue: '-' }).should.deepEqual([ '-' ])
      simplifyPropertyQualifiers(propQualifiers, { novalueValue: '' }).should.deepEqual([ '' ])
      done()
    })

    it('should return the desired somevalueValue', function (done) {
      const propQualifiers = Q19180293.claims.P1433[0].qualifiers.P156
      simplifyPropertyQualifiers(propQualifiers, { somevalueValue: '?' }).should.deepEqual([ '?' ])
      simplifyPropertyQualifiers(propQualifiers, { somevalueValue: '' }).should.deepEqual([ '' ])
      done()
    })

    it('should accept null as a possible value', function (done) {
      const propQualifiers = Q19180293.claims.P1433[0].qualifiers.P1100
      simplifyPropertyQualifiers(propQualifiers, { novalueValue: null }).should.deepEqual([ null ])
      done()
    })
  })
})

describe('simplifyQualifiers', function () {
  it('should simplify qualifiers', done => {
    const qualifiers = Q2112.claims.P190[1].qualifiers
    const simplified = simplifyQualifiers(qualifiers)
    simplified.P580.should.deepEqual([ '1953-01-01T00:00:00.000Z' ])
    done()
  })

  describe('empty values', function () {
    it('should return the desired novalueValue', function (done) {
      const qualifiers = Q19180293.claims.P1433[0].qualifiers
      simplifyQualifiers(qualifiers, { novalueValue: '-' }).P1100.should.deepEqual([ '-' ])
      simplifyQualifiers(qualifiers, { novalueValue: '' }).P1100.should.deepEqual([ '' ])
      done()
    })

    it('should return the desired somevalueValue', function (done) {
      const qualifiers = Q19180293.claims.P1433[0].qualifiers
      simplifyQualifiers(qualifiers, { somevalueValue: '?' }).P156.should.deepEqual([ '?' ])
      simplifyQualifiers(qualifiers, { somevalueValue: '' }).P156.should.deepEqual([ '' ])
      done()
    })

    it('should accept null as a possible value', function (done) {
      const qualifiers = Q19180293.claims.P1433[0].qualifiers
      simplifyQualifiers(qualifiers, { novalueValue: null }).P1100.should.deepEqual([ null ])
      done()
    })
  })
})

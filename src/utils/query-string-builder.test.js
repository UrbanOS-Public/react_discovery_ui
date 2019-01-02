import { QueryStringBuilder } from './'

describe('query string builder', () => {
  test.each(
    [
      ['sort=name_desc&facets%5Btags%5D%5B%5D=stuff&facets%5Btags%5D%5B%5D=things', { tags: ['stuff', 'things'] }, undefined, 'name_desc'],
      ['sort=last_mod&facets%5Borganization%5D%5B%5D=Slime%20Jime', { organization: ['Slime Jime'] }, undefined, 'last_mod'],
      ['q=GREG&sort=last_mod&facets%5Borganization%5D%5B%5D=Slime%20Jime&facets%5Btags%5D%5B%5D=stuff', { organization: ['Slime Jime'], tags: ['stuff'] }, 'GREG', 'last_mod']
    ]
  )('.createQueryString(%s, %s, %s, %s)', (expected, facets, searchCriteria, sort) => {
    expect(QueryStringBuilder.createQueryString(facets, searchCriteria, sort)).toBe(expected)
  })

  test('.createTagFilterQueryString("str")', () => {
    expect(QueryStringBuilder.createTagFilterQueryString('stuff')).toBe('facets%5Btags%5D%5B%5D=stuff')
  })

  test('.createTagFilterQueryString("[]")', () => {
    expect(QueryStringBuilder.createTagFilterQueryString(['stuff', 'things'])).toBe('facets%5Btags%5D%5B%5D=stuff&facets%5Btags%5D%5B%5D=things')
  })

  test('.createOrganizationFilterQueryString', () => {
    expect(QueryStringBuilder.createOrganizationFilterQueryString('Slime Jime')).toBe('facets%5Borganization%5D%5B%5D=Slime%20Jime')
  })
})

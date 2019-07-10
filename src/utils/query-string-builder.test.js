import { QueryStringBuilder } from './'

describe('query string builder', () => {
  describe('createQueryString', () => {
    test.each(
      [
        ['sort=name_desc&facets%5Btags%5D%5B%5D=stuff&facets%5Btags%5D%5B%5D=things&includeRemote=false',
         { tags: ['stuff', 'things'] }, undefined, 'name_desc', false
        ],
        ['sort=last_mod&facets%5Borganization%5D%5B%5D=Slime%20Jime&includeRemote=true',
         { organization: ['Slime Jime'] }, undefined, 'last_mod', true
        ],
        ['q=GREG&sort=last_mod&facets%5Borganization%5D%5B%5D=Slime%20Jime&facets%5Btags%5D%5B%5D=stuff&includeRemote=true',
         { organization: ['Slime Jime'], tags: ['stuff'] }, 'GREG', 'last_mod', true
        ]
      ]
    )('properly encodes facets=%s, search=%s, sort=%s to a URL of %s', (expected, facets, searchCriteria, sort, includeRemote) => {
      expect(QueryStringBuilder.createQueryString(facets, searchCriteria, sort, includeRemote)).toBe(expected)
    })
  })

  test('createTagFilterQueryString properly encodes a single filter value in a list', () => {
    expect(QueryStringBuilder.createTagFilterQueryString('stuff')).toBe('facets%5Btags%5D%5B%5D=stuff')
  })

  test('createTagFilterQueryString properly encodes multiple values in a list', () => {
    expect(QueryStringBuilder.createTagFilterQueryString(['stuff', 'things'])).toBe('facets%5Btags%5D%5B%5D=stuff&facets%5Btags%5D%5B%5D=things')
  })

  test('createOrganizationFilterQueryString properly encodes a single value as string', () => {
    expect(QueryStringBuilder.createOrganizationFilterQueryString('Slime Jime')).toBe('facets%5Borganization%5D%5B%5D=Slime%20Jime')
  })
})

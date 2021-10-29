import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe('Testing Fetch Helper', () => {

  let token = '';

  test('fetchWithoutToken should work ', async () => {
    
    const resp = await fetchWithoutToken('auth', { email: "patricia@gmail.com", password: "123456" }, 'POST');
    
    expect( resp instanceof Response ).toBe( true );

    const body = await resp.json();
    expect( body.ok ).toBe( true );

    token = body.token;
  });

  test('fetchWithToken should work ', async () => {

    localStorage.setItem('token', token);

    const resp = await fetchWithToken('events/61787396d6a1b098c79072e7', {}, 'DELETE');
    const body = await resp.json();

    expect( body.msg ).toBe('No existe evento con ese id');
  })
  
});

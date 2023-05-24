import Keychain from 'react-native-keychain';

export async function getAuthHeader() {
  const token = await getToken();
  if (token) {
    return {Authorization: `Bearer ${token || ''}`};
  } else {
    return {};
  }
}

export async function getToken() {
  try {
    const user = await Keychain.getGenericPassword();
    return user.password;
  } catch (err) {
    return null;
  }
}

export async function setToken(user) {
  if (user === null || user === undefined) {
    await Keychain.resetGenericPassword();
    return;
  }
  await Keychain.setGenericPassword(user.id.toString(), user.token);
}

export async function removeToken(user) {
  await setToken(null);
}

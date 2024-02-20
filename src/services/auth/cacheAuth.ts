import { IAuthUserState } from "../../types/providers-types/AuthProviderTypes";

const cacheUserName: string = "activity-management-UserCache";

function writeCacheUser(userData: IAuthUserState): void {
  localStorage[cacheUserName] = JSON.stringify(userData);
}

function readCacheUser(): any {
  let cache = localStorage[cacheUserName];
  if (cache) {
    return JSON.parse(cache);
  } else {
    return null;
  }
}

export { writeCacheUser, readCacheUser };

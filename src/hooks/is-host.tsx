import { UserRole } from "../__generated__/globalTypes";
import { useMe } from "./use-me";

export const IsHost = () => {
  const me = useMe();
  return me.data?.me.role === UserRole.Host;
};

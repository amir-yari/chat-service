import { v4 as uuidv4 } from "uuid";

const sessions: Record<
  string,
  { sessionId: string; userA: string; userB: string }
> = {};

export const getSession = (userA: string, userB: string) => {
  const existingSession = Object.values(sessions).find(
    (session) =>
      (session.userA === userA && session.userB === userB) ||
      (session.userA === userB && session.userB === userA)
  );

  if (existingSession) {
    return existingSession.sessionId;
  }

  const sessionId = uuidv4();
  sessions[sessionId] = { sessionId, userA, userB };
  return sessionId;
};

'reach 0.1';

const User = {
  nickname: Bytes(5),
  message: Bytes(5),
  displayName: Fun([Bytes(5)], Null),
  sendMessage: Fun([], Bytes(5)),
  seeMessage: Fun([Bytes(5)], Null),
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...User,
  });
  const Bob   = API('Bob', {
    ...User,
    messages: Map(Bytes(5),)
  });
  init();

  Alice.only(() => {
    const nicknameA = "Alice";
  });
  Alice.publish(nicknameA)
  commit();

  each([Alice, Bob], () => {
    interact.displayName(nicknameA);
  });

  Bob.only(() => {
    const nicknameB = "Bobby";
  });
  Bob.publish(nicknameB)
  commit();

  each([Alice, Bob], () => {
    interact.displayName(nicknameB);
  });
});
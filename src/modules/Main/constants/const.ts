const initData = {
  user: {
    id: 99281932,
    firstName: 'Andrew',
    lastName: 'Rogue',
    username: 'rogue',
    languageCode: 'en',
    isPremium: true,
    allowsWriteToPm: true,
  },
  hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
  authDate: new Date(1716922846000),
  startParam: 'debug',
  chatType: 'sender',
  chatInstance: '8428209589180549439',
};

const wallet = '0x4852dbB55711572c672970F6ff440914b91619CB';

export const USER_DATA = {
  id: initData.user.id,
  tier: 'Hero',
  username: initData.user.username,
  firstName: initData.user.firstName,
  lastName: initData.user.lastName,
  hash: initData.hash,
  wallet: wallet,
};

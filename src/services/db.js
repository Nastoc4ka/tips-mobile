
const users = [
    {
        id: 10000,
        username: 'Alex',
        avatar: 'png',
        role: 'admin',
        position: 'Администратор',
        password: 'qwerty',
        phone: '0501111111',
        organisation: 'BlackDiamond',
        city: 'Kyiv',
    },
    {
        id: 10001,
        username: 'John',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111112',
        organisation: 'BlackDiamond',
        city: 'Odessa'
    },
    {
        id: 10002,
        username: 'Anna',
        role: 'user',
        position: 'Официант',
        password: 'qwerty',
        phone: '0501111113',
        organisation: 'BlackDiamond',
        city: 'Sumy'
    },
];

const news = [
    {
        id: 100,
        user: {
            id: 10000,
            username: 'Alex',
            position: 'Администратор',
        },
        label: 'Корпоратив',
        description: 'Планируется провести корпоратив',
        reactions: [
            {
                id: 1,
                user: {
                   userId: 10001,
                   username: 'John',
                    position: 'Официант',
                },
                smile: ':('
            },
            {
                id: 2,
                user: {
                   userId: 10002,
                   username: 'Anna',
                    position: 'Официант',
                },
                smile: ':)'
            }
        ]
    }
];


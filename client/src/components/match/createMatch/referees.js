export const myReferees = [
    {
        user: {
            _id: "referee-user-1",
            email: "referee1@mail.com",
            password: "referee1@123",
            userName: "referee1"
        },
        fullName: 'John Doe',
        dateOfBirth: new Date('1985-07-15'),
        gender: 'Male',
        phone: '+1234567890',
        avatar: 'https://bit.ly/kent-c-dodds',
        address: '123 Main St, Cityville, State, Country',
        experienceYears: 10,
        achievements: [
            { achievement: 'Referee of the Year 2019', date: new Date('2019-12-31') },
            { achievement: 'Most Matches Officiated in 2020', date: new Date('2020-12-31') }
        ],
        comments: [
            { comment: 'Great referee, very professional!', commenter: 'user2_id' }
        ],
        fee: 50,
        matchesOfficiated: 100,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: "referee1"
    },
    {
        user: {
            _id: "referee-user-2",
            email: "referee2@mail.com",
            password: "referee2@123",
            userName: "referee2"
        },
        fullName: 'Jane Smith',
        dateOfBirth: new Date('1990-03-22'),
        gender: 'Female',
        phone: '+1987654321',
        avatar: 'https://bit.ly/dan-abramov',
        address: '456 Elm St, Townsville, State, Country',
        experienceYears: 8,
        achievements: [
            { achievement: 'Best New Referee 2017', date: new Date('2017-12-31') }
        ],
        comments: [
            { comment: 'Impressive skills on the field!', commenter: 'user1_id' }
        ],
        fee: 40,
        matchesOfficiated: 80,
        rating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: "referee2"
    }
];

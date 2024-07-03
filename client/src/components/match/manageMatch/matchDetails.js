export const matchDetails = {
    _id: "60d0fe4f5311236168a1938ca",
    date: "2024-07-01T15:00:00Z",
    location: "Soccer Field 1, New Mexico",
    type: "Free",
    fees: {
        fieldFee: 100,
        refFee: 50,
        titleFee: 20,
        joiningFee: 10
    },
    status: "Open",
    playerNeed: 22,
    pendingTeams: [
        {
            _id: "60d0fe4f5311239739g8a109cb",
            name: "Team A",
            avatar: "https://images.unsplash.com/photo-1625990637351-ee0e5e9ba5e5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb3RiYWxsJTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            _id: "60d0fe4f53112973dj68a109cb",
            name: "Team B",
            avatar: "https://images.unsplash.com/photo-1628891890377-57dba2715caf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjB0ZWFtfGVufDB8fDB8fHww"
        }
    ],
    maxTeams: 2,
    confirmedTeams: [
        {
            team: {
                _id: "60d0fe4f5319839g6168a109cc",
                name: "Team B",
                avatar: "https://images.unsplash.com/photo-1628891890377-57dba2715caf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGwlMjB0ZWFtfGVufDB8fDB8fHww"
            }
        },
        {
            team: {
                _id: "60d0fe4f53112361763f109cc",
                name: "Team C",
                avatar: "https://images.unsplash.com/photo-1625990637351-ee0e5e9ba5e5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb3RiYWxsJTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D"
            }
        }
    ],
    pendingPlayers: [
        {
            _id: "60d0fe4f5311236168a109cd",
            user: {
                _id: "60d0fe4f5311236168a345ce",
                userName: "Player A"
            },
            avatar: 'https://bit.ly/sage-adebayo'
        },
        {
            _id: "60d0fe4f5311236168a1645cd",
            user: {
                _id: "60d0fe4f5311236168a109ce",
                userName: "Player B"
            },
            avatar: 'https://bit.ly/sage-adebayo'
        },
    ],
    confirmedPlayers: [
        {
            _id: "60d0fe92f5311236168a110df",
            user: {
                _id: "60d0fe4f5311236168a109ee",
                userName: "Player B"
            },
            avatar: 'https://bit.ly/kent-c-dodds'
        }
    ],
    description: "Local friendly match featuring skilled teams in Soccer Field 1, New Mexico. Exciting competition with vibrant team spirit and enthusiastic player participation.",
    photos: ["https://example.com/photo1.jpg"],
    referee: {
        _id: "60d0fe4f53112363988a109cf",
        user: {
            _id: "60d0fe4f5311236168a109d0",
            userName: "Referee A"
        },
        avatar: 'https://bit.ly/dan-abramov',
        fee: 300,
    },
    field: {
        _id: "60d0fe4f5311236168a109d1",
        name: "Soccer Field 1",
        location: "New Mexico",
        photo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vdGJhbGwlMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D",
        fee: 100
    }
};

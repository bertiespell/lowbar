WALKTHROUGH OF THE DOCTORS PROBLEM
------

it.only => makes it so that this is the ONLY test that runs
.hasOwnProperty => gives a boolean if object has this property


USE CHAI THOUGH FOR TESTING:

expect(doctors[0]).to.have.ownProperty("doctorNumber");
expect(doctors[0]).to.not.have.ownProperty("number");

check documentation of chai for more useful tests. For instance there must be tons of methods on chai that I've not used

instead of Object.assign to deal with mutalibitly

could just write

.map(function (doc) {
    return {
        doctorNumber: "#" + doc.number
    }
})

THE ABOVE EXAMPLE returns a whole new object, rather than modifying the original
Because doctor.number = doctor.doctorNumber creates a MUTABILITY ERROR!!


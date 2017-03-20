/* Read 5 Questions - every Unit Test Must Answer - Javascript Scene on WAKELET.com

# PAIR PROGRAMMMING
-----

-  sticking to one computer
- driving => the person actually coding (implements what the navigator says)
- navigating => the person laying the code out (from the navigation)

Switch after a certain isolated functionality
POMODORO TECHNIQUE

- Agree on common practices and styles with your pair - Don't be stubborn!

- Agree on starting roles (driver/navigator) - aim for 50/50 split
- pair at similar level
- AS you switch roles, switch computers - pulling and pushing from github

- Add second argument to git clone command (DONT PUSH OR COMMIT) in the morning => because you will get rid of this code!

IMPLEMENTING UNDERSCORE METHODS
----

pick one - i.e. range
=> check documentation
- things in square brackets are optional arguments)
- 
"/* global describe, it */
/* THE ABOVE LINE => at the top is for linting - tells eslint to not worry about these two global variables

e.g.
*/

_.identity function () {
    _.range = function (stop) {
        //we need to check how many arguments are provided:
        if (arguments.length === 1){
            stop = start; //it has to be written this way around because other wise start is overwritten with 0 and then stop will= 0 and we will get an empty array
            start = 0;
        }
        var result = [];
        for(var i = start; i <stop; i++) {
            result.push(i);
        }
        return result;
    }
}

/*Don't write ("should return arrary"); write something instead like "should return an array when passed....."
write test: */

describe("#range", function () {
    it("is a function", function () {
        expect(_.range).be.a("function");
    });
    it("returns an array of consecutive intergers, starting from 0 and ending at the provided argument", function () {
        var actual = _.range(10);
        var expected = [0,1,2,3,4,5,6,7,8,9];
        expect(actual).to.eql(expected)
        }); // because arrays are stored by reference to test they are qequal will say that they are not the same, so we have to check that they are deeply equal!
        var actual = _.range(-3);
        var expected = []; //check the underscore site to see what it does (for isntance, on their site, they return an empty array for negative arguments), so we check this. BUT we might want to just implement the other main bits of functionality and ignore difficult sticking points (for example this). You might want to write // to do : test negative integers (might want a todo extension on VS code => which highlights to do)
        expect(actual).to.eql(expected)
        });
        it("returns an array of consecutive intergers, starting from the start argument (inclusive) and ending at the stop argument(exclusive", function () {
            var actual = _.range(2,5)
            var expected = [2,3,4]
            expect(actual).to.eql(expected);
        }));
});

//fork project, then clone (but DONT PUSH THIS)
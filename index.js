const mysql = require('mysql2/promise');

async function createConnection(){
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'teacher1',
            password: 'iamteacher1',
            database: 'class'
        });
        console.log(`connected as id ${connection.threadId}`);
        return connection;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function main(){
    const conn = await createConnection();

    const studentsToAdd = [{
        name: 'James Pochi',
        grade: 'A+'    
    }, {
        name: 'Lena Galloway',
        grade: 'A+'    
    }, {
        name: 'Scott Adams',
        grade: 'C+'    
    }, {
        name: 'Leon Katz',
        grade: 'B'    
    },
    {
        name: 'Mike Fitz',
        grade: 'F'    
    },
    {
        name: 'Jake Bama',
        grade: 'A+'    
    },
    {
        name: 'Kyle Cuz',
        grade: 'B'    
    },
    {
        name: 'Oscar Baa',
        grade: 'A+'    
    },
    {
        name: 'Kitty Fang',
        grade: 'B'    
    },];

    // helper to insert students into "class" database
    async function addStudent(name, grade){
        const query = "INSERT INTO students (name, grade) VALUES (?, ?);";
        try { 
            const [row] = await conn.execute(query, [name, grade]);
            console.log(`Student Id: ${row.insertId}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    };

    // waiting for all students to be added before running next query
    await Promise.all(studentsToAdd.map(student => addStudent(student.name, student.grade)));

    async function getStudentsByGrade(grade){
        const query = "SELECT s.name FROM students s WHERE s.grade =  ? ;";
        try {
            const [rows, fields] = await conn.execute(query, [grade]);
            return rows;
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }

    // get all students with 'A+' as a grade
    const students = await getStudentsByGrade('A+');
    console.log(students);

    conn.end().then(() => {
        process.exit(0);
    }).catch(err => {
        console.error(err);
        process.exit(1);
    })
}

main();
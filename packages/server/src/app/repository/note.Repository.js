import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createNotes = async (av1,av2,av3,final_grade,attendance,student_count,studentId,subjectId) => {

    const studentNotes = await prisma.student_Subject.create({
        data: {
            av1,
            av2,
            av3,
            final_grade,
            attendance,
            student_count,
            student: {
                connect: {
                    id: studentId
                }
            },
            subject:{
                connect:{
                    id:subjectId
                }
            }
            
        },
        select: {
            id: true,
            av1: true,
            av2: true,
            av3: true,
            final_grade: true,
            attendance: true,
            student_count: true,
            studentId: true,
            subjectId: true
        }
    });



    return studentNotes;
}




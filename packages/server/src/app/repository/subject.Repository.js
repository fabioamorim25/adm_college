import { prisma } from '../../lib/prismaClient'



// CRIAR O DOCUMENTO E RETONAR O DADO
export const createSubjects = async (sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, departamentId) => {
    // Converter o valor de sub_mandatory para boolean
    if (sub_mandatory === "true") sub_mandatory = true;
    if (sub_mandatory === "false") sub_mandatory = false;

    const subject = await prisma.subject.create({
        data: {
            sub_name,
            sub_shift,
            sub_start_time: `${sub_start_time}:00Z`,
            sub_stop_time: `${sub_stop_time}:00Z`,
            sub_description,
            sub_mandatory,
            departament: {
                connect: {
                    id: departamentId
                }
            }
        },
        select: {
            id: true,
            sub_name: true,
            sub_shift: true,
            sub_start_time: true,
            sub_stop_time: true,
            sub_description: true,
            sub_mandatory: true,
            departamentId: true,
        }
    });


    return subject;
}

// ASSOCIAR UMA MATERIA A UM CURSO
export const createAssociateSubjectCourse = async (departamentId, subjectName, courseName) => {

    const associatePromises = courseName.map(async (courseName) => {
        const association = await prisma.course_Subject.create({
            data: {
                subject: {
                    connect: {
                        sub_name: subjectName
                    }
                },
                course: {
                    connect: {
                        cou_name: courseName
                    }
                },
                departament: {
                    connect: {
                        id: departamentId
                    }
                }
            },
            select: {
                id: true,
                subject: false,
                subjectName: false,
                course: false,
                courseName: false,
                departament: false,
                departamentId: false,
                createdAt: false,
                updatedAt: false,
            }
        })
        return association
    })


    await Promise.all(associatePromises)

    return { message: 'Matéria foi associada ao curso com sucesso', type: 'success' }
};

// LISTAR TODAS AS MATÉRIAS DE UM CURSO
export const getSubjectsName = async (courseName) => {
    const subjects = await prisma.course_Subject.findMany({
        where: {
            courseName: courseName
        },
        select: {
            subject: {
                select: {
                    id: false,
                    sub_name: true,
                    sub_shift: false,
                    sub_start_time: false,
                    sub_stop_time: false,
                    sub_description: false,
                    sub_mandatory: false,
                    createdAt: false,
                    updatedAt: false,
                    departamentId: false,
                }
            }
        }
    })

    //filtra o obj para retornar a chave e o valor das matérias
    return subjects.map(subject => ({ sub_name: subject.subject.sub_name }));
}

//OBRIGATORIEDADE DA MATERIA
export const createSubjectMandatory = async (subjectName, preRequisite) => {
    const mandayory = await prisma.subjects_Subjects.create({
        data: {
            subject: {
                connect: {
                    sub_name: subjectName
                }
            },
            preRequisite
        },
        select: {
            id: true,
            subjectName: true,
            preRequisite: true,
        }
    })

    return;
}

// LISTAR MATÉRIAS
export const getNameSubjects = async () => {
    const subjects = await prisma.subject.findMany({
        select: {
            id: false,
            sub_name: true,
            sub_shift: false,
            sub_start_time: false,
            sub_stop_time: false,
            sub_description: false,
            sub_mandatory: false,
            createdAt: false,
            updatedAt: false,
            departamentId: false,
        }
    })
    return subjects
}

// LISTAR INFORMAÇÕES DAS MATÉRIAS
export const infoSubjects = async () => {
    try {
        const subjects = await prisma.subject.findMany({
            select: {
                id: true,
                sub_name: true,
                sub_shift: true,
                sub_start_time: true,
                sub_stop_time: true,
                sub_description: true,
                sub_mandatory: false,
                createdAt: false,
                updatedAt: true,
                departamentId: false,
                _count: {
                    select: {
                        Course_Subject: true,
                    },
                },
            },
        });

        return subjects;

    } catch (error) {
        return
    } finally {
        await prisma.$disconnect();
    }
}

// VER DADOS DE UMA MATÉRIA
export const getDataSubject = async (subjectId) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: {
                id: subjectId
            },
            select: {
                id: false,
                sub_name: true,
                sub_shift: true,
                sub_start_time: true,
                sub_stop_time: true,
                sub_description: true,
                sub_mandatory: true,
                createdAt: false,
                updatedAt: false,
                departamentId: false,
            }
        })
        return subject
    } catch (error) {
        return { message: "Tivemos um erro na listagem dos dados", type: "error" }
    } finally {
        await prisma.$disconnect();
    }
}

export const associationAndCourses = async (subjectId) => {

    try {
        const [associationResults, courseResults] = await Promise.all([
            prisma.course_Subject.findMany({
                where: {
                    subject: {
                        id: subjectId
                    }
                },
                select: {
                    id: true,
                    courseName: false,
                    course: {
                        select: {
                            id: true,
                            cou_name: true,
                            createdAt: false,
                            updatedAt: false,
                            departamentId: false,
                        }
                    },
                    subjectName: false,
                    subject: false,
                    createdAt: false,
                    updatedAt: false,
                }
            }),
            prisma.course.findMany({
                select: {
                    id: true,
                    cou_name: true,
                    updatedAt: true,
                    createdAt: false,
                    departamentId: false,
                }
            }),
        ])

        return { associationResults, courseResults }

    } catch (error) {
        return { message: "Tivemos um erro na listagem dos dados", type: "error" }
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteAssociationSubjectAndCourse = async (idAssociations) => {
    try {
        const deleteAssociationsPromises = idAssociations.map(async (idAssociation) => {
            return prisma.course_Subject.deleteMany({
                where: {
                    id: idAssociation
                }
            })
        })

        await Promise.all(deleteAssociationsPromises)
        return { message: "Deletado com sucesso", type: "success" }

    } catch (error) {
        return { message: "Tivemos um erro ao deletar os dados", type: "error" }
    } finally {
        await prisma.$disconnect();
    }
}



// EDITAR A MATÉRIA
export const updatedSubject = async (id, numberModel, departamentId, data) => {
    try {
        const updateDataSubject = async (id, departamentId, data) => {
            if (data.sub_mandatory === "true") data.sub_mandatory = true;
            if (data.sub_mandatory === "false") data.sub_mandatory = false;

            const update = await prisma.subject.update({
                where: {
                    id
                },
                data: {
                    sub_name: data.sub_name,
                    sub_shift: data.sub_shift,
                    sub_start_time: `${data.sub_start_time}:00.000Z`,
                    sub_stop_time: `${data.sub_stop_time}:00.000Z`,
                    sub_description: data.sub_description,
                    sub_mandatory: data.sub_mandatory,
                    departament: {
                        connect: {
                            id: departamentId
                        }
                    }
                },
                select: {
                    id: true,
                    sub_name: true,
                    sub_shift: true,
                    sub_start_time: true,
                    sub_stop_time: true,
                    sub_description: true,
                    sub_mandatory: true,
                    createdAt: true,
                    updatedAt: true,
                    departamentId: true
                }
            });

            if (!update) {
                return { message: "Erro na edição dos dados", type: "error" };
            }
            return { message: "Edição realizada com sucesso", type: "success" };
        };
        const updateAssociation = async (departamentId, data) => {
            const { subjectName, item } = data;

            if (data.action === 'create') {
                const courseName = item.nonDuplicate.map(obj => obj.cou_name);
                return await createAssociateSubjectCourse(departamentId, subjectName, courseName)
            }
            if (data.action === 'delete') {
                const idAssociations = item.map(obj => obj.id)
                return await deleteAssociationSubjectAndCourse(idAssociations)
            }
            if (data.action === 'deleteAndCreate') {
                const idAssociations = item.itemsNoLonger.map(obj => obj.id)
                const nameCourses = item.nonDuplicate.map(obj => obj.cou_name)

                await deleteAssociationSubjectAndCourse(idAssociations)
                await createAssociateSubjectCourse(departamentId, subjectName, nameCourses)
                return { message: "Edição realizada com sucesso", type: "success" }
            }

            return;
        }
        // const updateMandatory = async (id, departamentId, data) => {
        //     return
        // }

        //1°
        switch (numberModel) {
            case 1:
                return await updateDataSubject(id, departamentId, data)
            case 2:
                return await updateAssociation(departamentId, data)
            case 3:
                return await updateMandatory(id, data)
            default:
                return { message: "Erro na edição dos dados", type: "error" }
        }

    } catch (error) {
        console.log(error)
        // return { message: "Tivemos um erro na edição dos dados", type: "error" }
    } finally {
        await prisma.$disconnect();
    }
}
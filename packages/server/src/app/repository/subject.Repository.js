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
// LISTAR MATÉRIAS E REQUISITOS DA MATÉRIA
export const listSubjectAndRequirements = async (subjectName) => {
    try {
        const [subjects, Requirements] = await Promise.all([
            prisma.subject.findMany({
                select: {
                    id: true,
                    sub_name: true
                }
            }),
            prisma.subjects_Subjects.findMany({
                where: {
                    subjectName
                },
                select: {
                    id: true,
                    preRequisite: true,
                    subject: false,
                    subjectName: false,
                    createdAt: false,
                    updatedAt: false,
                }
            })
        ])

        return { subjects, Requirements }

    } catch (error) {
        return res.status(404).json({ message: "Erro ao carregar os dados", type: "error" })
    } finally {
        await prisma.$disconnect();
    }
}

export const createPreRequisite = async (departamentId, subjectName, newPreRequisite) => {
    try {
        const createPromises = newPreRequisite.map(async (preRequisite) => {
            const create = await prisma.subjects_Subjects.create({
                data: {
                    subject: {
                        connect: {
                            sub_name: subjectName
                        }
                    },
                    preRequisiteSubject: {
                        connect: {
                            sub_name: preRequisite
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
                    preRequisite: false,
                    preRequisiteSubject: false,
                    subject: false,
                    subjectName: false,
                    createdAt: false,
                    updatedAt: false,
                }
            });

            return create;
        });

        await Promise.all(createPromises);
        return { message: 'Pré requisito definido com sucesso', type: 'success' }
    } catch (error) {
        return { message: "Tivemos um erro no registro do pré requisito", type: "error" }
    }
}

export const deleteSubjectMandatory = async (idRequisite) => {
    try {
        const deletePreRequisitePromise = idRequisite.map(async (id) => {
            return prisma.subjects_Subjects.deleteMany({
                where: {
                    id: id
                }
            })
        })

        await Promise.all(deletePreRequisitePromise)
        return { message: "Deletado com sucesso", type: "success" }
    } catch (error) {
        return { message: "Tivemos um erro ao deletar o pré requisito", type: "error" }
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
        const updateMandatory = async (departamentId, data) => {
            const { subjectName, item } = data;

            if (data.action === 'create') {
                const newPreRequisite = item.nonDuplicate
                return await createPreRequisite(departamentId, subjectName, newPreRequisite)
            }
            if (data.action === 'delete') {
                const idRequisite = item.map(id => id.idRequired)
                return await deleteSubjectMandatory(idRequisite)
            }
            if (data.action === 'deleteAndCreate') {
                const idRequisite = item.itemsNoLonger.map(id => id.idRequired)
                const newPreRequisite = item.nonDuplicate

                await deleteSubjectMandatory(idRequisite)
                await createPreRequisite(departamentId, subjectName, newPreRequisite)
                return { message: "Edição realizada com sucesso", type: "success" }
            }

            return;
        }

        //1°
        switch (numberModel) {
            case 1:
                return await updateDataSubject(id, departamentId, data)
            case 2:
                return await updateAssociation(departamentId, data)
            case 3:
                return await updateMandatory(departamentId, data)
            default:
                return { message: "Erro na edição dos dados", type: "error" }
        }

    } catch (error) {
        return { message: "Tivemos um erro na edição dos dados", type: "error" }
    } finally {
        await prisma.$disconnect();
    }
}
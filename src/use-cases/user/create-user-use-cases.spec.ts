import { CreateUserUseCase } from "./create-user-use-cases"


const makeSut = () => {
  const sut = new CreateUserUseCase();
  return { sut };
}


describe('CreateUserUseCase', () => {
  test('eu espero que receba todos os paramentros ', async () => {
    const { sut  } = makeSut();
    const body = {
      name:'yazalde',
      email:'',
      password:'123456'
    }
    const response = await sut.execute(body);


    expect(response).toBe({})
  })
})

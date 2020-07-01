import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

class CreateCategoryService {
  public async execute({ category }: Request): Promise<Category> {
    const repository = getRepository(Category);

    const exist = await repository.findOne({
      where: { title: category },
    });

    if (exist) {
      return exist;
    }

    const created = repository.create({ title: category });
    await repository.save(created);
    return created;
  }
}

export default CreateCategoryService;

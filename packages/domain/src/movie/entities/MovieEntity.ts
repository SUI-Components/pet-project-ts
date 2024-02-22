import {z} from 'zod'

import {IDValueObject} from '../../_kernel/valueObjects/IDValueObject'
import {DescriptionValueObject} from '../valueObjects/Description'
import {ImageValueObject} from '../valueObjects/ImageValueObject'
import {TitleValueObject} from '../valueObjects/Title'

export const MovieEntityValidation = z.object({
  id: z.string({required_error: 'ID required'}),
  title: z.string({required_error: 'title required'}),
  description: z.string({required_error: 'description required'}),
  image: z.string({required_error: 'Image required'})
})

export class MovieEntity {
  static create({id, title, description, image}: z.infer<typeof MovieEntityValidation>) {
    MovieEntityValidation.parse({id, title, description, image})

    return new MovieEntity(
      IDValueObject.create({value: id}),
      TitleValueObject.create({value: title}),
      DescriptionValueObject.create({value: description}),
      ImageValueObject.create({value: image}),
      false
    )
  }

  static empty() {
    return new MovieEntity(
      IDValueObject.empty(),
      TitleValueObject.empty(),
      DescriptionValueObject.empty(),
      ImageValueObject.empty(),
      true
    )
  }

  constructor(
    private readonly _id: IDValueObject,
    private readonly _title: TitleValueObject,
    private readonly _description: DescriptionValueObject,
    private readonly _image: ImageValueObject,
    private readonly _empty: boolean
  ) {}

  get id() {return this._id.value} // eslint-disable-line 
  get title() {return this._title.value} // eslint-disable-line 
  get description() {return this._description.value} // eslint-disable-line 
  get image() {return this._image.value} // eslint-disable-line 

  isEmpty() {return this._empty} // eslint-disable-line

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image
    }
  }
}

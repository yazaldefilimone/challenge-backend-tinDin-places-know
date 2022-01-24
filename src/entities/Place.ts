import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('places')
class Place {
  @PrimaryColumn()
  readonly id:string

  @Column()
  name:string

  @Column()
  place:string

  @CreateDateColumn()
  created_at:Date


  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}

export { Place }

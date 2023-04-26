import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * 基础业务实体
 */
export abstract class BaseBusinessEntity {
  @Column({
    name: 'del_flag',
    type: 'char',
    length: 1,
    default: '0',
    comment: '删除标志（0存在 1删除）',
  })
  delFlag: number

  @Column({
    name: 'create_by',
    type: 'varchar',
    length: 50,
    default: '',
    comment: '创建者',
  })
  createBy: string

  @CreateDateColumn({
    name: 'created_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date

  @Column({
    name: 'update_by',
    type: 'varchar',
    length: 50,
    default: '',
    comment: '更新者',
  })
  updateBy: string

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'datetime',
    comment: '更新时间',
  })
  updateTime: Date

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 500,
    default: '',
    comment: '备注',
  })
  remark: string
}

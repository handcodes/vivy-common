interface TreeConfig {
  id: string
  pid: string
  children: string
}

const DEFAULT_CONFIG: TreeConfig = {
  id: 'id',
  pid: 'pid',
  children: 'children',
}

/**
 * 树结构操作方法
 */
export class TreeUtils {
  /**
   * 获取配置
   * @param config 配置
   * @returns 合并后的配置
   */
  static getConfig(config: Partial<TreeConfig>): TreeConfig {
    return Object.assign({}, DEFAULT_CONFIG, config)
  }

  /**
   * 列表转树
   * @param list 原始列表数据
   * @param config 配置
   * @returns 转换后的树数据
   */
  static listToTree<T = any>(list: any[], config: Partial<TreeConfig> = {}): T[] {
    const conf = TreeUtils.getConfig(config)
    const nodeMap = new Map()
    const result: T[] = []
    const { id, pid, children } = conf

    for (const node of list) {
      node[children] = node[children] || []
      nodeMap.set(node[id], node)
    }

    for (const node of list) {
      const parent = nodeMap.get(node[pid])
      ;(parent ? parent[children] : result).push(node)
    }

    return result
  }
}

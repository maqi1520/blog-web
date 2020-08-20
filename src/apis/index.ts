import { Provide, Func } from '@midwayjs/decorator'

@Provide()
export class APIService {
  @Func('api.render', { middleware: ['fmw:staticFile'] })
  async render() {
    return 'Building... Please refresh this page later.'
  }
}

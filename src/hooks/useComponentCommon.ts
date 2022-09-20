// l-text 等公共组件抽离styleProps和handleClick事件绑定
import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from '../defaultProps'
const useComponentCommon = (props:Readonly<Partial<TextComponentProps>>, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))
  const handleClick = () => {
    if (props.actionType === 'url'&& props.url) {
      window.location.href = props.url
    }
  }
  return {
    styleProps,
    handleClick
  }
}

export default useComponentCommon
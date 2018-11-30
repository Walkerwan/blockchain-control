/**
 * 此文件为工具类， 与业务无关但比较常用的功能
 */

class CommonUtil {
    constructor() {
    }
    /**
     * 阻止事件冒泡
     * @param {dom} e
     */
    preventBubble(e) {
        //js阻止事件冒泡
        e.cancelBubble = true;
        e.stopPropagation();
    }
}

export default new CommonUtil();
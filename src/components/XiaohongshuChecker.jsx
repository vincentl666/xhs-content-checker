import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Shield } from 'lucide-react';

const XiaohongshuChecker = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  // 违禁词库
  const bannedWords = {
    极限用语: [
      '国家级', '世界级', '最高级', '第一', '唯一', '首个', '首选', '顶级',
      '填补国内空白', '独家', '首家', '最新', '最先进', '第一品牌', '金牌',
      '名牌', '优秀', '独家', '全网销量第一', '全球首发', '全国首家',
      '全网首发', '世界领先', '顶级工艺', '王牌', '销量冠军', 'NO1', 'Top1',
      '极致', '永久', '掌门人', '领袖品牌', '独一无二', '绝无仅有',
      '史无前例', '万能', '最高', '最低', '最', '最具', '最便宜',
      '最大程度', '最新技术', '最先进科学', '最佳', '最大', '最好',
      '最新科学', '最先进加工工艺', '最时尚', '最受欢迎', '最先',
      '绝对值', '绝对', '大牌', '精确', '超赚', '领导品牌', '领先上市',
      '巨星', '著名', '奢侈', '100%', '国际品质', '高档', '正品'
    ],
    权威性词语: [
      '国家领导人推荐', '国家机关推荐', '国家机关专供', '特供',
      '质量免检', '无需国家质量检测', '免抽检', '老字号',
      '中国驰名商标', '专供'
    ],
    诱导点击: [
      '恭喜获奖', '全民免单', '点击有惊喜', '点击获取', '点击试穿',
      '领取奖品', '转发三三子', '一键三连'
    ],
    刺激消费: [
      '秒杀', '抢爆', '再不抢就没了', '不会再便宜了', '错过就没机会了',
      '万人疯抢', '抢疯了'
    ],
    医疗用语: [
      '治疗', '治愈', '消炎', '抗炎', '活血', '解毒', '抗敏', '脱敏',
      '减肥', '清热解毒', '清热祛湿', '除菌', '杀菌', '抗菌', '灭菌',
      '防菌', '消毒', '排毒', '防敏', '柔敏', '舒敏', '缓敏', '褪敏',
      '镇定', '镇静', '理气', '行气', '生肌', '补血', '安神', '养脑',
      '益气', '通脉', '利尿', '驱寒解毒', '调节内分泌', '延缓更年期',
      '补肾', '生发', '防癌', '抗癌', '祛疤', '降血压', '防治高血压',
      '改善内分泌', '平衡荷尔蒙', '去除体内毒素', '除湿', '润燥',
      '美容治疗', '消除斑点', '无斑', '生黑发', '止脱', '生发止脱',
      '毛发新生', '毛发再生', '酒糟鼻', '伤口愈合', '清除毒素',
      '缓解痉挛', '处方', '药方', '丘疹', '脓疱', '癣', '脚气',
      '牛皮癣', '湿疹', '感冒', '经痛', '头痛', '腹痛', '便秘',
      '支气管炎', '消化不良', '烧伤', '烫伤', '毛囊炎', '皮肤感染',
      '细菌', '真菌', '念珠菌', '激素', '荷尔蒙', '抗生素',
      '药物', '中草药', '细胞再生', '免疫力', '疤痕', '冻疮', '冻伤'
    ],
    迷信用语: [
      '带来好运', '增强第六感', '化解小人', '增加事业运', '招财进宝',
      '健康富贵', '提升运气', '有助事业', '护身', '平衡正负能量',
      '消除精神压力', '逢凶化吉', '时来运转', '万事亨通', '旺人',
      '旺财', '助吉避凶', '转富招福'
    ],
    化妆品虚假宣传: [
      '特效', '高效', '全效', '强效', '速效', '速白', '一洗白',
      '天见效', '周期见效', '超强', '激活', '全方位', '全面',
      '安全', '无毒', '溶脂', '吸脂', '燃烧脂肪', '瘦身', '瘦脸',
      '瘦腿', '延年益寿', '提高记忆力', '消除', '清除', '化解死细胞',
      '去除皱纹', '平皱', '修复断裂弹性纤维', '永不褪色',
      '破坏黑色素细胞', '阻断黑色素', '丰乳', '丰胸', '预防乳房松弛',
      '改善睡眠', '舒眠'
    ]
  };

  const checkText = () => {
    if (!inputText.trim()) {
      alert('请输入要检测的内容');
      return;
    }

    const foundWords = [];
    const allBannedWords = [];
    
    // 收集所有违禁词
    Object.entries(bannedWords).forEach(([category, words]) => {
      words.forEach(word => {
        allBannedWords.push({ word, category });
      });
    });

    // 检测违禁词
    allBannedWords.forEach(({ word, category }) => {
      if (inputText.includes(word)) {
        foundWords.push({ word, category });
      }
    });

    // 计算健康分 (100分制，每个违禁词扣分)
    const baseScore = 100;
    const deduction = foundWords.length * 8;
    const healthScore = Math.max(0, baseScore - deduction);

    // 风险评估
    let riskLevel = '';
    let riskColor = '';
    let riskDesc = '';
    
    if (healthScore >= 90) {
      riskLevel = '低风险';
      riskColor = 'text-green-600';
      riskDesc = '内容较为安全，被限流风险低';
    } else if (healthScore >= 70) {
      riskLevel = '中风险';
      riskColor = 'text-yellow-600';
      riskDesc = '存在违禁词，建议修改以降低限流风险';
    } else if (healthScore >= 50) {
      riskLevel = '高风险';
      riskColor = 'text-orange-600';
      riskDesc = '违禁词较多，很可能被限流，请尽快修改';
    } else {
      riskLevel = '极高风险';
      riskColor = 'text-red-600';
      riskDesc = '严重违规，极易被限流或下架';
    }

    setResult({
      foundWords,
      healthScore,
      riskLevel,
      riskColor,
      riskDesc
    });
  };

  const highlightText = () => {
    if (!result || result.foundWords.length === 0) {
      return inputText;
    }

    let highlightedText = inputText;
    const replacements = [];

    // 收集所有需要替换的位置
    result.foundWords.forEach(({ word }) => {
      let index = 0;
      while ((index = highlightedText.indexOf(word, index)) !== -1) {
        replacements.push({ start: index, end: index + word.length, word });
        index += word.length;
      }
    });

    // 按位置排序并去重
    replacements.sort((a, b) => a.start - b.start);
    const uniqueReplacements = [];
    replacements.forEach(rep => {
      if (!uniqueReplacements.some(ur => 
        (rep.start >= ur.start && rep.start < ur.end) ||
        (rep.end > ur.start && rep.end <= ur.end)
      )) {
        uniqueReplacements.push(rep);
      }
    });

    // 构建高亮文本
    const parts = [];
    let lastIndex = 0;
    uniqueReplacements.forEach(({ start, end, word }) => {
      if (start > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>{highlightedText.slice(lastIndex, start)}</span>
        );
      }
      parts.push(
        <span key={`highlight-${start}`} className="bg-red-500 text-white px-1 rounded">
          {word}
        </span>
      );
      lastIndex = end;
    });
    if (lastIndex < highlightedText.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>{highlightedText.slice(lastIndex)}</span>
      );
    }

    return parts;
  };

  const reset = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-6 pt-4">
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            小红书违禁词检测
          </h1>
          <p className="text-gray-600 text-sm">
            智能检测违禁词，避免内容限流
          </p>
        </div>

        {/* 输入区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            输入要检测的内容：
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在这里粘贴你的小红书文案..."
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none resize-none text-gray-700"
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={checkText}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-md"
            >
              违禁词检测
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              重置
            </button>
          </div>
        </div>

        {/* 检测结果 */}
        {result && (
          <>
            {/* 健康分和风险评估 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="text-red-500" size={24} />
                  <h2 className="text-xl font-bold text-gray-800">检测结果</h2>
                </div>
                {result.foundWords.length === 0 ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <AlertCircle className="text-red-500" size={24} />
                )}
              </div>

              {/* 健康分 */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">内容健康分</span>
                  <span className={`text-3xl font-bold ${
                    result.healthScore >= 90 ? 'text-green-600' :
                    result.healthScore >= 70 ? 'text-yellow-600' :
                    result.healthScore >= 50 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {result.healthScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      result.healthScore >= 90 ? 'bg-green-500' :
                      result.healthScore >= 70 ? 'bg-yellow-500' :
                      result.healthScore >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.healthScore}%` }}
                  />
                </div>
              </div>

              {/* 风险评估 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">风险等级</span>
                  <span className={`text-lg font-bold ${result.riskColor}`}>
                    {result.riskLevel}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{result.riskDesc}</p>
                <p className="text-gray-500 text-xs mt-2">
                  检测到 {result.foundWords.length} 个违禁词
                </p>
              </div>
            </div>

            {/* 标红显示 */}
            {result.foundWords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  违禁词标红显示
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {highlightText()}
                </div>
              </div>
            )}

            {/* 违禁词列表 */}
            {result.foundWords.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  检测到的违禁词
                </h3>
                <div className="space-y-2">
                  {Object.entries(
                    result.foundWords.reduce((acc, { word, category }) => {
                      if (!acc[category]) acc[category] = [];
                      if (!acc[category].includes(word)) acc[category].push(word);
                      return acc;
                    }, {})
                  ).map(([category, words]) => (
                    <div key={category} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="font-semibold text-gray-700 mb-1">
                        {category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {words.map((word, idx) => (
                          <span
                            key={idx}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.foundWords.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  恭喜！未检测到违禁词
                </h3>
                <p className="text-gray-600">
                  你的内容很安全，可以放心发布
                </p>
              </div>
            )}
          </>
        )}

        {/* 底部提示 */}
        <div className="text-center mt-6 text-gray-500 text-xs">
          <p>仅供参考，实际审核以平台为准</p>
        </div>
      </div>
    </div>
  );
};

export default XiaohongshuChecker;

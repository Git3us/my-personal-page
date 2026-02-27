import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'motion/react';
import { 
  Sun, Moon, Code, Server, Database, Layers, ArrowUpRight, 
  Terminal, Cpu, Briefcase, GraduationCap, Award, ChevronDown, 
  CheckCircle, Zap, MessageSquare, Users, ShieldCheck, PenTool,
  Camera, Coffee, Music, MapPin, Calendar, Heart
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// --- Data Content ---

const ADVANTAGES = [
  { icon: <Cpu />, title: "一线研发与大促备战", desc: "拥有丰富的一线互联网应用研发、大促活动备战经验，熟练掌握多种主流技术，具备源码阅读能力。" },
  { icon: <MessageSquare />, title: "沟通与表达", desc: "具有良好的沟通和书面表达能力，能够清晰传达自己的想法，能与团队成员建立维护良好的关系。" },
  { icon: <ShieldCheck />, title: "责任心与执行力", desc: "具有强烈的责任心和执行力，对待工作态度积极，细心负责，能够按照计划高效、高质量完成任务。" },
  { icon: <Users />, title: "团队精神", desc: "性格乐观开朗，具有很强的团队精神，能够快速适应并融入新的团队。" },
  { icon: <Zap />, title: "抗压能力", desc: "在面临高强度的工作压力，能保持良好的抗压能力。" },
  { icon: <PenTool />, title: "AI 提效", desc: "熟练应用 AI 工具进行日常工作提效。" },
];

const EXPERIENCES = [
  {
    company: "北京京东科技有限公司",
    role: "软件开发工程师",
    period: "2021.01 - 2024.01",
    summary: "本段工作经历为外包经历，项目经历属实，甲方评级均为 A。",
    desc: [
      "负责使用 Java 语言进行软件开发，包括编写、调试和优化代码，以满足业务需求；",
      "参与软件项目的需求分析和设计，以及与其他开发人员协作，共同完成项目的开发和维护；",
      "对开发过程中出现的问题进行跟踪和解决，保证软件质量和性能；",
      "进行系统性能的调优和优化，以保证用户体验；",
      "参与代码的评审，以确保代码的质量和规范性；",
      "配合测试团队进行软件的测试，以确保软件的稳定性和可靠性；",
      "对系统进行日常的维护和升级，发现并解决系统中出现的问题；",
      "与产品、运营等团队进行沟通，解析业务需求并实现项目落地；",
      "参与技术文档的编写，以便于其他开发人员进行理解和维护；",
      "持续关注 Java 技术的最新发展，提升个人技术能力和业务理解，以满足公司业务的发展需求；",
      "熟悉各类主流框架、中间件，如 Spring、Spring Boot、Spring MVC、Maven、Git、Dubbo、JSF、MySQL、MongoDB、Redis、Netty、Kafka、RocketMQ、Zookeeper、MyBatis、ShardingSphere、Docker、Tomcat 等，业务能力较强。"
    ]
  },
  {
    company: "厦门智鹿科��有限公司",
    role: "软件开发工程师",
    period: "以前",
    desc: [
      "业务需求分析设计，并产出相应工作文档编制；",
      "参与核心功能的代码开发及关键技术问题解决；",
      "负责平台应用系统的模块开发、服务接口实现、维护接口等工作；",
      "与测试人员沟通，完成核心功能模块的跟测以及缺陷修复工作；",
      "按照研发流程规范，完成项目相关文档的维护和更新归档。"
    ]
  }
];

const PROJECTS = [
  {
    title: "京东金融 - 金条信贷福利周",
    role: "服务端",
    period: "2023.11 - 2024.01",
    tags: ["营销活动", "MQ", "高并发"],
    content: {
      background: "该项目为京东金条首次进行营销活动，旨在通过每月底分配的 A 级活动资源为金条及其相关活动提供显著的曝光增长。目标群体为：无迫切借款需求且拥有良好信用记录用户。该群体为现金贷业务长期发展的重点客户。由于这些用户的借款准备度不高，直接转化效率较低，项目需求设计低门槛活动策略，以逐步提升其借款意愿，引导用户至更高借款准备度阶段，促进转化并实现平台价值的最大化。",
      gameplay: "用户通过完成任务以及每日登录获取抽卡次数，当用户抽卡至指定次数，将获得对应返息折扣，用户在活动期间抽卡并产生借款行为后，将持续 30 天为用户发放借款返息奖励。",
      work: "主要负责活动首页模块、活动信息管理模块、借款信息模块、任务模块。在活动期间，用户连续签到可获取抽卡次数，用户进入页面成功即默认签到，在首页模块为用户展示当期抽卡次数、连签天数、已抽卡次数、剩余抽卡次数、本期奖励、返息折扣等信息。提供单独列表供用户查看借款记录、返息记录。对接任务平台，通过 MQ 在用户完成指定任务后更改任务状态、记录流水以及为用户增加抽卡次数。同时结合中台能力搭建运营配置后台，活动期间运营可根据需要来替换 Banner、Icon、奖励文案、折扣等信息，后端逻辑也会随运营配置完成自动变更。"
    }
  },
  {
    title: "京东金融 - 金条三方 Offer",
    role: "服务端",
    period: "2023.08 - 2023.11",
    tags: ["OCR", "审批流", "OSS", "提额"],
    content: {
      background: "为了提升金条评定额度或降低借款利率，推出了金条三方 Offer 项目，用户通过上传其他信贷产品的评估额度，通过运营后台处理申请单的方式来决定用户是否符合降息要求，帮助金条业务侧更准确地评估用户的信用状况，且通过较轻盈的交互方式为金条侧业务带来更多新用户及业务价值。",
      work: "负责日常维护及业务需求承接、版本迭代、运营后台功能实现。项目采用 Spring、Maven、JSF、Zookeeper、MySQL、Redis、Kafka。用户在活动页面可上传其他平台借款额度截图，人工核实无误后点击审批通过，即调用金条侧接口为用户申请提额，后通过监听 MQ 来接收提额成功消息，记录流水并修改页面内展示可用额度信息、申请记录、申请状态、申请结果等信息。截图使用京东云 OSS 服务进行图片存储。项目内对接算法部门 OCR 文字识别能力，对接后在审批后台可直接识别图片中文字内容，同时搭建运营后台用于配置合理范围区间、相似字符纠错，最终由代码进行干预调整，使得识别结果更为准确，极大降低审核人员手动输入额度信息、个人信息的工作量。",
      link: "https://btfront.jd.com/release/threeoffer/home/"
    }
  },
  {
    title: "京东金融 - 15 理财日",
    role: "服务端 & Scrum Master",
    period: "2023.04 - 2023.09",
    tags: ["ClickHouse", "实时数仓", "分布式锁", "XXL-JOB"],
    content: {
      background: "15 理财日是一个以学分为介质的月度活动，每个月 15 日～21 日可在线累计学分，22 日～25 日期间瓜分奖励，当月累计学分越高可瓜分奖励金额越高。活动期间用户可以通过答题、完成任务等方式领取财运券用以站内财富产品交易。每月活动期间交易 GMV 占比大盘 20% 左右，是每月交易峰值增量工具。",
      gameplay: "用户通过答题、购买合作机构推品或指定基金可获取学分，若用户答错可通过完成指定任务的形式赢取复活机会。每期活动开始，用户可根据历史累计学分值兑换不同区间的无门槛奖励，也可购买指定基金对该奖励进行膨胀。当期用户所获得的学分都会被计入学分排行榜，排行榜结算时排名前 100 的用户将获得 PLUS 会员季卡奖励。当期活动结束后，根据用户在本期内获取学分分为三个档位，每个档位的用户可瓜分对应现金池内现金，奖励以小金库红包形式发放给用户。",
      work: "在此项目中，担任主要研发及 Scrum Master 角色。项目采用 Spring、Maven、JSF（Dubbo）、Zookeeper。使用 JMQ（Kafka）监听任务平台侧用户任务完成进度，以及活动期间学分流水、答题记录、奖品流水等信息异步落库。数据持久化部分使用 MySQL 来对用户学分获取记录、累计学分、瓜分记录、往期参与记录以及答题进度等进行存储，Redis 分布式锁实现防重、防刷功能。排行榜部分数据对接数仓，使用基于 ClickHouse 的实时数仓进行数据持久化，引入对账机制，同时保障数据的准确性。活动结束时，使用多线程技术，计算出当期参与活动的所有用户在所属分段下应得的奖励。并运用 XXL-JOB 进行跑批进行奖励分发。结合中台能力搭建运营配置后台，通过运营后台可在线调换活动开始结束时间、Banner、Icon、题目难易程度、答对题目后可获得学分数、累计答对 X 题后可得的额外奖品信息等。",
      link: "https://show.jd.com/m/dPM1/?pageKey=dPM1"
    }
  },
  {
    title: "京东金融 - 退休计算器",
    role: "服务端",
    period: "2023.02 - 2023.04",
    tags: ["Redis", "快速迭代", "社交裂变"],
    content: {
      background: "针对社会热点\"延迟退休\"和\"存够 XX 万元躺平靠利息生活\"，开展了退休计算器活动，引导用户理性规划退休生活。用户输入实际收入、支出等信息，通过既定公式计算后得出用户退休所需年份，结合趣味图片，诙谐幽默，增强互动性的同时发放优惠券，并以按钮文案吸引用户购买理财产品以提升转化。",
      work: "项目采用 Spring、Maven、JSF（Dubbo）、Zookeeper。由于该业务属活动性质，投放周期较短，采用 Redis 进行数据持久化。结合中台能力搭建运营配置后台，除页面固定板块，其余均支持可在服务端后台进行拓展及替换，在丰富展示内容的同时降低研发人力投入。",
      achievement: "活动累计去重 UV 11.2w，全期去重 UV 4.3w，其中 1.8w 参与测算（参与率 41%），参与用户中 1.3w 用户（占比 72%）浏览到结果页，页面平均浏览时长 15.21 秒。1.3w 浏览到结果页面的的用户中，有 13.4% 的用户愿意主动点击分享，项目整体分享率 4%（分享/UV），用户邀请回流率 120%，邀请成功率 59%，表现较好。在公司内部 ERP、电梯海报和内部员工群渠道传播，组织员工分享集赞，提升公司内部存量用户活跃性；同时提升活动传播内容的公信力，激发外部用户自发参与积极性。除京东金融、京东财富官微、公众号传播矩阵，首次与流量拓展部门合作，在头部站外渠道如小红书、虎扑论坛、今日头条等露出，单条文章最高浏览量 9k+。"
    }
  },
  {
    title: "京东金融 - 2023 开门红",
    role: "服务端",
    period: "2022.12 - 2023.01",
    tags: ["组件化", "高并发", "交易转化"],
    content: {
      background: "为了营造 2023 开工后的喜庆氛围，同时带动财富业务转化，开展开门红系列活动。页面主要通过红包雨的形式向用户分发积分、京豆等利益点，在红包雨结束后主会场楼层展示优质推品、以及膨胀楼层，对接任务系统，在用户购买相应基金产品并达到入金金额后自动为用户发放奖励。",
      work: "项目采用 Spring、Maven、JSF（Dubbo）、Zookeeper。用户通过点击在红包雨下落的红包可获得分数或惊喜奖励，红包雨结束后统计用户得分并为用户发放对应奖励。通过 JMQ（Kafka）与任务平台进行对接，监听任务完成状态 MQ 为用户发奖。数据存储部分使用 MySQL 进行数据持久化。Redis 用于缓存、防重。通过中台能力搭建运营后台，运营可通过配置后台更换活动主图、Banner、Icon、红包雨样式、奖品、入金金额门槛等信息。",
      achievement: "● 累计拉新获客：转化稳健新 1000 用户 8567 户（综合占比大盘 41.3%，日均 1050 户），转化权益 100 新用户 13143 户（占比大盘 23.6%，日均 1658 户），转化小金库 100 新用户 4525 人，转化 1000 新用户 821 人，转化黄金开户交易 1643 人，转化股票开户 581 人。\n● 累计交易：活动期累计交易 GMV 4.02 亿元（占比大盘 14.6%，日均 5130 万元），累计带来基金交易用户数 6 万（占比大盘 13.3%，交易日日均 7694 人）。\n● 在该项目中沉淀出更加通用的推品楼层组件，除原有基础配置（如 Icon、主副标题、奖励信息、单位、任务编号等）外，结合任务平台时间轴功能将多个奖励与任务绑定为组，支持运营在更复杂场景下的灵活配置。可通过引入配置平台组件 ID 对组件进行复用，减轻研发工作量。"
    }
  },
  {
    title: "京东金融 - 会员徽章体系 & 徽章配置后台",
    role: "核心研发",
    period: "2022.04 - 2022.11",
    tags: ["体系建设", "数据跑批", "Thymeleaf"],
    content: {
      background: "为提升用户忠诚度，设计并实现了会员徽章体系，徽章体系将各业务深度发展诉求与平台交叉价值相结合，该业务为原会员体系升级迭代，对金融会员体系进行横向拆解，由原本的平台会员系统横向拆分拓展为各业务线独立的徽章体系。该业务穿插于金融四大业务线（白条、小金库、财富、金条），为各业务独立出业务线积分的概念，于每月 8 号定时任务跑批对用户的业务线积分进行汇总、等级升降、奖励发放等统一操作。为徽章权益详情页提供统一接口进行解耦，开放给各业务线根据各自需求进行定制化开发。",
      gameplay: "1）业务深度引导：通过各 Level 业务权益 + 通关权益，牵引用户在单业务线上不断深入，贡献价值。\n2）业务价值积累：连续三个月点亮某业务线 Lv.4 徽章，获得“业务王者”称号（徽章增加专属角标），业务权益翻倍。（如连续三个月点亮白条 Lv.4 徽章，获“白条王者”称号，白条业务权益翻倍。）",
      work: "在此项目中，担任主要研发之一。项目采用 Spring Boot、Maven、JSF（Dubbo）、Zookeeper。用户可在金融个人页查看当前徽章等级、权益信息，领取当前等级专属奖励。使用 XXL-JOB 每月 8 号进行数据跑批，根据用户行为更新徽章等级。使用 HTML + CSS + Thymeleaf + JavaScript 搭建独立运营后台，方便运营对往期数据、用户个人数据详情等信息进行查询、编辑。引入 Echarts 在后台为运营直观展示各种指标数据（如当月某业务线新增用户、升级用户、各等级用户、用户权益领取记录）。在后台提供可对徽章样式、权益页展示内容、父子权益关联等进行灵活配置。"
    }
  },
  {
    title: "京东金融 - 平台用户生日关怀",
    role: "服务端",
    period: "2022.03 - 2022.07",
    tags: ["Feed 流", "MQ", "用户关怀"],
    content: {
      background: "为提升用户体验，计划于金融首页投放平台用户关怀类产品，\"用户生日关怀\"在用户生日当天会在金融 APP 首页变更氛围图，引导用户进入生日活动页，给予用户生日祝福，引导拆开生日礼包获取奖励、生日当天折扣商品。",
      work: "在该项目中担任主要研发，负责项目日常维护及业务需求承接。结合平台能力，通过监听 MQ 获取当天生日的平台用户，并统一于每日 10 点后弹出祝福窗口、生日祝福 PUSH 以及站内信。用户领取生日礼物后，跳转至活动主页面，展示用户所获得的生日礼物、祝福贺卡，同时使用 Feed 流向用户展示生日当天享有折扣的商品，引导用户进行购买。",
      link: "https://show.jd.com/m/5pxW/?pageKey=5pxW"
    }
  },
  {
    title: "京东金融 - 我的优惠券",
    role: "服务端",
    period: "2022.01 - 2022.06",
    tags: ["性能优化", "多线程"],
    content: {
      background: "为了方便用户查看和管理优惠券，在【京东金融 APP】-【我的】-【优惠券】页面中展示用户于京东金融 APP 获取所有的优惠券数量、优惠券概览信息。",
      work: "在此项目中，担任主要研发。负责项目日常维护、大促备战及承接京东金融四大业务线定制化展示需求。项目使用 Spring、Maven、JSF（Dubbo）、Zookeeper。因项目承接时中台尚不具备优惠券信息统一配置能力，所以各业务线传来的优惠券信息也是五花八门，【我的优惠券】用以在二级页面确保优惠券信息正确、统一展示，避免客诉（如 0 折、95 折、最高可减 0 元等）。用户可在页面内查询所持有的所有可用、已过期、已使用、不可用优惠券。",
      achievement: "负责该项目期间对代码主动进行优化，原有逻辑会在用户进入页面时，调用优惠券信息查询接口对优惠券详情信息进行查询以及构建，由于上游接口限制，每次仅允许查询 10 张优惠券信息，导致用户持有大量优惠券在进入页面时 RT 过长。在与上游协调沟通后改用多线程对接口进行调用，成功将该接口响应时间由最高 700ms+ 降至 100ms 以内，用户体验得到极大提升。",
      link: "https://m.jr.jd.com/member/newmc_jue/?romaFileName=page_my_coupon&utm_term=copyurl"
    }
  },
  {
    title: "京东金融 - 天天神券",
    role: "服务端",
    period: "2021.10 - 2022.05",
    tags: ["秒杀", "LUA 脚本", "防刷", "RocketMQ"],
    content: {
      background: "为了更好地满足用户对购物优惠的需求，开发了金融领券中心和天天神券功能。金融领券中心为天天神券的前身，二者都是将各业务线的优惠券进行归类并集中投放，方便用户能够更清楚的了解到商品的优惠活动和信息，后因业务方感觉页面展示信息过于单一，为更好提高业务转化，在原有功能基础上迭代项目，命名为天天神券，该项目除原本应有的优惠券领取信息及商品页引导跳转外，新增如积分兑换优惠券、优惠券秒杀信息等资源位，进一步提升页面可互动性。",
      work: "项目采用 Spring、Maven、JSF、Zookeeper、MySQL、RocketMQ。Spring MVC 用于搭建独立运营后台，Redis 用于实现分布式锁、秒杀库存异步扣减、接口防刷、布隆过滤器。该项目与传统领券中心功能类似，提供各业务线优惠券领取、展示、广告资源位投放。经改造后新增积分兑换、优惠券秒杀等模块。\n\n积分兑换优惠券模块：首先根据所需积分分值范围、用户是否可兑等条件在不同 Tab 内进行排列，用户点击兑换时调用积分扣减接口，对用户进行积分扣减以及优惠券发放。\n\n秒杀优惠券模块：运营可在运营后台进行数量、开始时间、结束时间、优惠券基础信息等配置。项目基于后台配置的秒杀开始时间、结束时间使用定时任务定期自动开启秒杀活动、秒杀开始前进行缓存预热，使用 CDN + Nginx + Redis 架构缓存静态资源，以抵御高并发下的瞬时流量。使用 LUA 脚本与 Redis 交互确保库存正确扣减，在缓存扣减后发送 MQ 实现领券流水等信息的异步落库。使用 Token 进行防刷、防重，布隆过滤器拦截恶意请求。"
    }
  },
  {
    title: "京东金融 - 用户持仓页",
    role: "服务端",
    period: "2021.07 - 2021.11",
    tags: ["低代码", "Groovy", "数据聚合"],
    content: {
      background: "为了满足用户查看各业务线收益基础需求，并增强用户对金融 APP \"我的\"用户陪伴服务的体验，研发用户持仓页，页面的直观展示用户金融各业务线持有的资产情况、用户资产盈亏情况，以及投放部分广告位进行导流。",
      work: "在该项目中担任主要研发，负责项目日常维护以及业务需求迭代，新业务线对接等。该项目使用京东内部低代码平台星链进行搭建，代码部分采用 Groovy 语言进行编写。业务对接京东金融内多项可投资产品，使用星链平台进行 RPC 调用时可通过拖拽对应模块来进行简易配置、并行调用，业务代码主要部分仅需对各业务线返回的结果进行固定排序、组合，最终将用户所持有的资产、收益进行汇总、分类并展示给用户。"
    }
  },
  {
    title: "京东金融 - 固收+",
    role: "服务端",
    period: "2021.06 - 2021.08",
    tags: ["用户分层", "低代码", "Groovy"],
    content: {
      background: "当前货币基金、银行理财等相对偏无风险的产品收益率不断走低，由于【京东金融 - 银行+】产品面临下架问题，流出的用户多数是一些非专业型用户，会将收益与银行产品做对比，如收益过高，则会产生不信任、害怕被骗的主观感受。固收+ 基金产品的策略正符合此类用户的稳健投资需求。同时市场震荡期，固收+ 这类稳健型产品也可作为资产配置，降低波动，产品主要目标为吸引稳健用户群，扩大基金人群范围。",
      work: "在该项目中担任主要研发角色，负责项目日常维护、大促备战以及承接业务需求，该项目使用京东内部低代码平台星链进行搭建，代码部分采用 Groovy 语言进行编写。页面主要用于引导用户对基金经理挑选的优质推品进行购买以及收藏。"
    }
  },
  {
    title: "京东金融财富 - 牛股选基",
    role: "服务端",
    period: "2021.02 - 2021.05",
    tags: ["港股投资", "低代码", "Groovy"],
    content: {
      background: "\"股票选基\"满足了用户通过投资重仓优质公司的基金来分享增长红利的需求，同时也解决了用户因为没有港股账户等原因而无法参与估值较低的港股投资的问题。直观展示基金、大盘占比等信息，且能根据用户需求按各维度信息进行排序的功能以便于用户察看关注的信息。",
      work: "负责项目日常维护及承接业务需求，该项目使用京东内部低代码平台星链进行搭建，代码采用 Groovy 编写。用户可根据股票代码查看该支股票重仓基金，并提供不同维度排序以方便用户了解基金、大盘占比等信息。"
    }
  }
];

const HOBBIES = [
  { icon: <Coffee />, title: "精品咖啡", desc: "手冲 / 意式 / 探店" },
  { icon: <Music />, title: "电子音乐", desc: "Synthwave / Techno / 现场" },
  { icon: <Camera />, title: "街头摄影", desc: "胶片 / 城市建筑 / 光影" },
];

const LIFE_LOGS = [
  { year: "2023", title: "京都徒步", desc: "完成了首次海外独自旅行" },
  { year: "2022", title: "健身里程碑", desc: "达成年度跑量 500km" },
  { year: "2021", title: "第一只猫", desc: "领养了一只美短起司" },
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
];

// --- Components ---

// 1. Theme Toggle (Enhanced with Fluid Gradient)
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.className = saved;
    setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem('theme', next);
  };

  return (
    <motion.button 
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed top-6 right-6 z-50 p-2.5 rounded-full backdrop-blur-md border transition-all duration-500 overflow-hidden group
        ${theme === 'dark' 
          ? 'bg-slate-800/60 border-slate-700 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
          : 'bg-white/80 border-slate-200 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
        }`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
        ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} 
      />
      <AnimatePresence mode='wait'>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// 2. Timeline Item
const TimelineItem = ({ data, index }: { data: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative pl-8 pb-12 border-l-2 border-[var(--border-color)] last:border-0"
  >
    <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ring-4 transition-colors duration-300
      bg-blue-500 ring-blue-500/20 dark:ring-blue-500/10`} 
    />
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
      <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">{data.company}</h3>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
          {data.role}
        </span>
        <span className="text-xs font-mono text-[var(--text-sub)]">{data.period}</span>
      </div>
    </div>
    {data.summary && (
      <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-medium">
        {data.summary}
      </div>
    )}
    <ul className="space-y-3">
      {data.desc.map((item: string, i: number) => (
        <li key={i} className="text-sm text-[var(--text-sub)] flex items-start gap-2.5 leading-relaxed text-justify-mixed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// 3. Project Card
const ProjectCard = ({ project }: { project: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="glass-card rounded-xl overflow-hidden group border border-[var(--border-color)]">
      <motion.div layout="position" className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-blue-500 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--text-sub)] mt-1 font-mono flex items-center gap-2">
              <span>{project.period}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{project.role}</span>
            </p>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="p-1.5 rounded-full hover:bg-[var(--bg-deep)]/10 transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-[var(--text-sub)]" />
          </motion.div>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-2.5 py-1 text-[11px] rounded-md font-medium bg-[var(--bg-deep)]/5 text-[var(--text-sub)] border border-[var(--border-color)]">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--border-color)] bg-[var(--bg-deep)]/2"
          >
            <div className="p-6 text-sm text-[var(--text-sub)] leading-7 space-y-6">
              {project.content.background && (
                <div>
                  <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Database className="w-3 h-3" /> 项目背景
                  </h4>
                  <p className="text-justify-mixed">{project.content.background}</p>
                </div>
              )}
              {project.content.gameplay && (
                <div>
                  <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> 玩法机制
                  </h4>
                  <p className="text-justify-mixed whitespace-pre-line">{project.content.gameplay}</p>
                </div>
              )}
              {project.content.work && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Code className="w-3 h-3" /> 工作内容
                  </h4>
                  <p className="text-justify-mixed whitespace-pre-line">{project.content.work}</p>
                </div>
              )}
              {project.content.achievement && (
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Award className="w-3 h-3" /> 业绩成果
                  </h4>
                  <p className="text-justify-mixed whitespace-pre-line text-emerald-700/80 dark:text-emerald-400/90 font-medium">
                    {project.content.achievement}
                  </p>
                </div>
              )}
              {project.content.link && (
                <div className="pt-2">
                  <a 
                    href={project.content.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 underline underline-offset-4"
                  >
                    查看项目链接 <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
      });
    });
    
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-blue-500/30 selection:text-white">
      
      {/* Backgrounds */}
      {theme === 'dark' ? <div className="bg-tech-dark" /> : <div className="bg-tech-light" />}
      
      {/* Header Overlay */}
      <div className="fixed top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[var(--bg-current)] to-transparent pointer-events-none z-10" />

      {/* Controls */}
      <ThemeToggle />

      <main className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 space-y-24 z-20">
        
        {/* 1. Hero Section (Updated with Avatar) */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Avatar Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-cyan-400">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-current)]">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&h=400" 
                    alt="Avatar" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
               </div>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold shadow-lg border-2 border-[var(--bg-current)]">
              OPEN TO WORK
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold w-fit mx-auto md:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              软件开发工程师 / 服务端
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--text-main)]"
            >
              构建高并发、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                高可用的后端架构
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[var(--text-sub)] max-w-2xl leading-relaxed"
            >
              拥有一线互联网大厂研发经验，专注于分布式系统设计与性能调优。
              擅长 Java 生态、高并发场景下的业务落地及工程效能提升。
            </motion.p>
          </div>
        </section>

        {/* 2. Core Advantages */}
        <section>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--text-main)]"
          >
            <Award className="w-6 h-6 text-blue-500" />
            个人优势
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-xl h-full flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20">
                  {adv.icon}
                </div>
                <h3 className="font-bold text-[var(--text-main)] mb-3">{adv.title}</h3>
                <p className="text-sm text-[var(--text-sub)] leading-relaxed text-justify-mixed flex-1">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Work Experience */}
        <section>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--text-main)]"
          >
            <Briefcase className="w-6 h-6 text-blue-500" />
            工作经历
          </motion.h2>
          <div className="ml-2 pl-4">
            {EXPERIENCES.map((exp, i) => (
              <TimelineItem key={i} data={exp} index={i} />
            ))}
          </div>
        </section>

        {/* 4. Projects */}
        <section>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--text-main)]"
          >
            <Layers className="w-6 h-6 text-blue-500" />
            项目经历
            <span className="text-sm font-normal text-[var(--text-sub)] ml-2">(点击查看完整方案)</span>
          </motion.h2>
          
          <LayoutGroup>
            <div className="grid grid-cols-1 gap-4">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </LayoutGroup>
        </section>

        {/* 5. Education */}
        <section>
           <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2 text-[var(--text-main)]"
          >
            <GraduationCap className="w-6 h-6 text-blue-500" />
            教育背景
          </motion.h2>
           <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-xl bg-[var(--bg-deep)]/5 border border-[var(--border-color)]">
              <div className="p-3 rounded-full bg-[var(--text-sub)]/10 w-fit">
                <GraduationCap className="w-6 h-6 text-[var(--text-sub)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-main)]">海口经济学院</h3>
                <p className="text-sm text-[var(--text-sub)] font-medium mt-1">工程管理本科 · 非全日制 · 2020 - 2024</p>
              </div>
           </div>
        </section>

        {/* 6. Life & Interests (New Section) */}
        <section className="pt-10 border-t border-[var(--border-color)]">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-12 flex items-center gap-2 text-[var(--text-main)]"
          >
            <Heart className="w-6 h-6 text-rose-500" />
            生活 B 面
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Hobbies (Left Col) */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-sub)] uppercase tracking-wider mb-4">个人爱好</h3>
              {HOBBIES.map((hobby, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl glass-card">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                    {hobby.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--text-main)]">{hobby.title}</div>
                    <div className="text-xs text-[var(--text-sub)]">{hobby.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Life Log (Middle Col) */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-sub)] uppercase tracking-wider mb-4">生活日志</h3>
              <div className="relative border-l border-[var(--border-color)] ml-3 pl-8 py-2 space-y-8">
                {LIFE_LOGS.map((log, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-[var(--text-sub)] border-2 border-[var(--bg-current)]" />
                    <span className="text-xs font-mono text-blue-500 mb-1 block">{log.year}</span>
                    <h4 className="text-md font-bold text-[var(--text-main)]">{log.title}</h4>
                    <p className="text-sm text-[var(--text-sub)]">{log.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Album (Bottom) */}
          <div className="mt-12">
             <h3 className="text-sm font-bold text-[var(--text-sub)] uppercase tracking-wider mb-6 flex items-center gap-2">
               <Camera className="w-4 h-4" /> 摄影相册
             </h3>
             <div className="flex gap-4 overflow-x-auto pb-6 snap-x">
               {PHOTOS.map((url, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   className="snap-center shrink-0 w-[280px] h-[200px] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-sm"
                 >
                   <img src={url} alt="Life" className="w-full h-full object-cover" />
                 </motion.div>
               ))}
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}

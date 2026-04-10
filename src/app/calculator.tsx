'use client';

import { useState, useEffect } from 'react';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface CalculatorState {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  loanType: 'mortgage' | 'auto' | 'personal' | 'student';
  downPayment: number;
}

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: 'Loan Calculator',
    loanAmount: 'Loan Amount',
    interestRate: 'Annual Interest Rate (%)',
    loanTerm: 'Loan Term (Years)',
    downPayment: 'Down Payment',
    loanType: 'Loan Type',
    mortgage: 'Mortgage',
    auto: 'Auto Loan',
    personal: 'Personal Loan',
    student: 'Student Loan',
    calculate: 'Calculate',
    monthlyPayment: 'Monthly Payment',
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    ltvRatio: 'Loan-to-Value Ratio',
    amortizationSchedule: 'Amortization Schedule (First 12 Months)',
    month: 'Month',
    payment: 'Payment',
    principal: 'Principal',
    interest: 'Interest',
    balance: 'Balance',
    expandAll: 'Expand All Months',
    principalVsInterest: 'Principal vs Interest Breakdown',
    quickTerms: 'Quick Term Selection',
  },
  ko: {
    title: '대출 계산기',
    loanAmount: '대출 금액',
    interestRate: '연 이율 (%)',
    loanTerm: '대출 기간 (년)',
    downPayment: '선금',
    loanType: '대출 유형',
    mortgage: '모기지',
    auto: '자동차 대출',
    personal: '개인 대출',
    student: '학생 대출',
    calculate: '계산',
    monthlyPayment: '월 지불액',
    totalPayment: '총 지불액',
    totalInterest: '총 이자',
    ltvRatio: '대출가치비율',
    amortizationSchedule: '상환 일정 (처음 12개월)',
    month: '월',
    payment: '지불',
    principal: '원금',
    interest: '이자',
    balance: '잔액',
    expandAll: '모든 월 확장',
    principalVsInterest: '원금 vs 이자 분석',
    quickTerms: '빠른 기간 선택',
  },
  ja: {
    title: 'ローン計算機',
    loanAmount: 'ローン金額',
    interestRate: '年利率 (%)',
    loanTerm: 'ローン期間 (年)',
    downPayment: '頭金',
    loanType: 'ローンタイプ',
    mortgage: 'モーゲージ',
    auto: '自動車ローン',
    personal: '個人ローン',
    student: '学生ローン',
    calculate: '計算',
    monthlyPayment: '月次支払',
    totalPayment: '総支払額',
    totalInterest: '総利息',
    ltvRatio: 'LTV比率',
    amortizationSchedule: '償却スケジュール (最初の12ヶ月)',
    month: '月',
    payment: '支払',
    principal: '元本',
    interest: '利息',
    balance: '残高',
    expandAll: 'すべての月を展開',
    principalVsInterest: '元本対利息の内訳',
    quickTerms: 'クイック期間選択',
  },
  zh: {
    title: '贷款计算器',
    loanAmount: '贷款金额',
    interestRate: '年利率 (%)',
    loanTerm: '贷款期限 (年)',
    downPayment: '首付',
    loanType: '贷款类型',
    mortgage: '抵押贷款',
    auto: '汽车贷款',
    personal: '个人贷款',
    student: '学生贷款',
    calculate: '计算',
    monthlyPayment: '月付款',
    totalPayment: '总付款',
    totalInterest: '总利息',
    ltvRatio: '贷款价值比',
    amortizationSchedule: '摊销表 (前12个月)',
    month: '月份',
    payment: '付款',
    principal: '本金',
    interest: '利息',
    balance: '余额',
    expandAll: '展开所有月份',
    principalVsInterest: '本金对利息分析',
    quickTerms: '快速期限选择',
  },
  es: {
    title: 'Calculadora de Préstamos',
    loanAmount: 'Monto del Préstamo',
    interestRate: 'Tasa de Interés Anual (%)',
    loanTerm: 'Plazo del Préstamo (Años)',
    downPayment: 'Pago Inicial',
    loanType: 'Tipo de Préstamo',
    mortgage: 'Hipoteca',
    auto: 'Préstamo Automotriz',
    personal: 'Préstamo Personal',
    student: 'Préstamo Estudiantil',
    calculate: 'Calcular',
    monthlyPayment: 'Pago Mensual',
    totalPayment: 'Pago Total',
    totalInterest: 'Interés Total',
    ltvRatio: 'Relación Préstamo-Valor',
    amortizationSchedule: 'Tabla de Amortización (Primeros 12 Meses)',
    month: 'Mes',
    payment: 'Pago',
    principal: 'Principal',
    interest: 'Interés',
    balance: 'Saldo',
    expandAll: 'Expandir Todos los Meses',
    principalVsInterest: 'Desglose Principal vs Interés',
    quickTerms: 'Selección Rápida de Plazo',
  },
  fr: {
    title: 'Calculatrice de Prêt',
    loanAmount: 'Montant du Prêt',
    interestRate: 'Taux d\'Intérêt Annuel (%)',
    loanTerm: 'Durée du Prêt (Ans)',
    downPayment: 'Acompte',
    loanType: 'Type de Prêt',
    mortgage: 'Hypothèque',
    auto: 'Prêt Auto',
    personal: 'Prêt Personnel',
    student: 'Prêt Étudiant',
    calculate: 'Calculer',
    monthlyPayment: 'Paiement Mensuel',
    totalPayment: 'Paiement Total',
    totalInterest: 'Intérêt Total',
    ltvRatio: 'Ratio Prêt-Valeur',
    amortizationSchedule: 'Tableau d\'Amortissement (12 Premiers Mois)',
    month: 'Mois',
    payment: 'Paiement',
    principal: 'Principal',
    interest: 'Intérêt',
    balance: 'Solde',
    expandAll: 'Développer Tous les Mois',
    principalVsInterest: 'Décomposition Principal vs Intérêt',
    quickTerms: 'Sélection Rapide de Durée',
  },
  de: {
    title: 'Darlehensrechner',
    loanAmount: 'Darlehensbetrag',
    interestRate: 'Jahreszinssatz (%)',
    loanTerm: 'Darlehenszeit (Jahre)',
    downPayment: 'Anzahlung',
    loanType: 'Darlehenstyp',
    mortgage: 'Hypothek',
    auto: 'Autokredit',
    personal: 'Privatdarlehen',
    student: 'Studentendarlehen',
    calculate: 'Berechnen',
    monthlyPayment: 'Monatliche Zahlung',
    totalPayment: 'Gesamtzahlung',
    totalInterest: 'Gesamtzinsen',
    ltvRatio: 'Beleihungsquote',
    amortizationSchedule: 'Tilgungsplan (erste 12 Monate)',
    month: 'Monat',
    payment: 'Zahlung',
    principal: 'Kapital',
    interest: 'Zinsen',
    balance: 'Saldo',
    expandAll: 'Alle Monate erweitern',
    principalVsInterest: 'Kapital vs Zinsen Aufteilung',
    quickTerms: 'Schnelle Zeitauswahl',
  },
  pt: {
    title: 'Calculadora de Empréstimos',
    loanAmount: 'Valor do Empréstimo',
    interestRate: 'Taxa de Juros Anual (%)',
    loanTerm: 'Prazo do Empréstimo (Anos)',
    downPayment: 'Entrada',
    loanType: 'Tipo de Empréstimo',
    mortgage: 'Hipoteca',
    auto: 'Empréstimo Automotivo',
    personal: 'Empréstimo Pessoal',
    student: 'Empréstimo Estudantil',
    calculate: 'Calcular',
    monthlyPayment: 'Pagamento Mensal',
    totalPayment: 'Pagamento Total',
    totalInterest: 'Juros Totais',
    ltvRatio: 'Razão Empréstimo-Valor',
    amortizationSchedule: 'Tabela de Amortização (Primeiros 12 Meses)',
    month: 'Mês',
    payment: 'Pagamento',
    principal: 'Principal',
    interest: 'Juros',
    balance: 'Saldo',
    expandAll: 'Expandir Todos os Meses',
    principalVsInterest: 'Decomposição Principal vs Juros',
    quickTerms: 'Seleção Rápida de Prazo',
  },
  ru: {
    title: 'Калькулятор кредитов',
    loanAmount: 'Размер кредита',
    interestRate: 'Годовая процентная ставка (%)',
    loanTerm: 'Срок кредита (лет)',
    downPayment: 'Первоначальный взнос',
    loanType: 'Тип кредита',
    mortgage: 'Ипотека',
    auto: 'Автокредит',
    personal: 'Личный кредит',
    student: 'Студенческий кредит',
    calculate: 'Рассчитать',
    monthlyPayment: 'Ежемесячный платеж',
    totalPayment: 'Общая сумма платежей',
    totalInterest: 'Общая сумма процентов',
    ltvRatio: 'Коэффициент LTV',
    amortizationSchedule: 'График амортизации (первые 12 месяцев)',
    month: 'Месяц',
    payment: 'Платеж',
    principal: 'Основная сумма',
    interest: 'Проценты',
    balance: 'Остаток',
    expandAll: 'Расширить все месяцы',
    principalVsInterest: 'Анализ основной суммы и процентов',
    quickTerms: 'Быстрый выбор срока',
  },
  ar: {
    title: 'حاسبة القروض',
    loanAmount: 'مبلغ القرض',
    interestRate: 'معدل الفائدة السنوي (%)',
    loanTerm: 'مدة القرض (سنوات)',
    downPayment: 'دفعة أولى',
    loanType: 'نوع القرض',
    mortgage: 'الرهن العقاري',
    auto: 'قرض السيارة',
    personal: 'قرض شخصي',
    student: 'قرض الطالب',
    calculate: 'حساب',
    monthlyPayment: 'الدفعة الشهرية',
    totalPayment: 'إجمالي الدفعة',
    totalInterest: 'إجمالي الفائدة',
    ltvRatio: 'نسبة القرض إلى القيمة',
    amortizationSchedule: 'جدول الاستهلاك (أول 12 شهرًا)',
    month: 'الشهر',
    payment: 'الدفعة',
    principal: 'رأس المال',
    interest: 'الفائدة',
    balance: 'الرصيد',
    expandAll: 'توسيع جميع الأشهر',
    principalVsInterest: 'تحليل رأس المال مقابل الفائدة',
    quickTerms: 'اختيار المدة السريع',
  },
  hi: {
    title: 'ऋण कैलकुलेटर',
    loanAmount: 'ऋण राशि',
    interestRate: 'वार्षिक ब्याज दर (%)',
    loanTerm: 'ऋण अवधि (वर्ष)',
    downPayment: 'अग्रिम भुगतान',
    loanType: 'ऋण प्रकार',
    mortgage: 'बंधक',
    auto: 'ऑटो ऋण',
    personal: 'व्यक्तिगत ऋण',
    student: 'छात्र ऋण',
    calculate: 'गणना करें',
    monthlyPayment: 'मासिक भुगतान',
    totalPayment: 'कुल भुगतान',
    totalInterest: 'कुल ब्याज',
    ltvRatio: 'ऋण-से-मूल्य अनुपात',
    amortizationSchedule: 'परिशोधन अनुसूची (पहले 12 महीने)',
    month: 'महीना',
    payment: 'भुगतान',
    principal: 'मूलधन',
    interest: 'ब्याज',
    balance: 'शेष',
    expandAll: 'सभी महीने विस्तृत करें',
    principalVsInterest: 'मूलधन बनाम ब्याज विश्लेषण',
    quickTerms: 'त्वरित अवधि चयन',
  },
  it: {
    title: 'Calcolatrice Prestiti',
    loanAmount: 'Importo del Prestito',
    interestRate: 'Tasso di Interesse Annuale (%)',
    loanTerm: 'Durata del Prestito (Anni)',
    downPayment: 'Acconto',
    loanType: 'Tipo di Prestito',
    mortgage: 'Mutuo',
    auto: 'Prestito Auto',
    personal: 'Prestito Personale',
    student: 'Prestito Studentesco',
    calculate: 'Calcola',
    monthlyPayment: 'Pagamento Mensile',
    totalPayment: 'Pagamento Totale',
    totalInterest: 'Interesse Totale',
    ltvRatio: 'Rapporto Prestito-Valore',
    amortizationSchedule: 'Tabella di Ammortamento (Primi 12 Mesi)',
    month: 'Mese',
    payment: 'Pagamento',
    principal: 'Capitale',
    interest: 'Interesse',
    balance: 'Saldo',
    expandAll: 'Espandi Tutti i Mesi',
    principalVsInterest: 'Analisi Capitale vs Interesse',
    quickTerms: 'Selezione Rapida Durata',
  },
  nl: {
    title: 'Lenenrekenmachine',
    loanAmount: 'Leningbedrag',
    interestRate: 'Jaarlijkse Rentevoet (%)',
    loanTerm: 'Leningstermijn (Jaren)',
    downPayment: 'Aanbetaling',
    loanType: 'Soort lening',
    mortgage: 'Hypotheek',
    auto: 'Autolening',
    personal: 'Persoonlijke lening',
    student: 'Studentenlening',
    calculate: 'Berekenen',
    monthlyPayment: 'Maandelijkse betaling',
    totalPayment: 'Totale betaling',
    totalInterest: 'Totale rente',
    ltvRatio: 'Lening-Waardeverhoudinginget',
    amortizationSchedule: 'Aflossingsschema (eerste 12 maanden)',
    month: 'Maand',
    payment: 'Betaling',
    principal: 'Hoofdsom',
    interest: 'Rente',
    balance: 'Saldo',
    expandAll: 'Alle maanden uitvouwen',
    principalVsInterest: 'Ontleding Hoofdsom vs Rente',
    quickTerms: 'Snelle Termijnkeuze',
  },
  pl: {
    title: 'Kalkulator Pożyczek',
    loanAmount: 'Kwota Pożyczki',
    interestRate: 'Roczna Stopa Procentowa (%)',
    loanTerm: 'Okres Pożyczki (Lata)',
    downPayment: 'Zaliczka',
    loanType: 'Typ Pożyczki',
    mortgage: 'Hipoteka',
    auto: 'Pożyczka Samochodowa',
    personal: 'Pożyczka Osobista',
    student: 'Pożyczka Studencka',
    calculate: 'Oblicz',
    monthlyPayment: 'Płatność Miesięczna',
    totalPayment: 'Płatność Całkowita',
    totalInterest: 'Całkowite Odsetki',
    ltvRatio: 'Stosunek Pożyczki do Wartości',
    amortizationSchedule: 'Harmonogram Amortyzacji (pierwsze 12 miesięcy)',
    month: 'Miesiąc',
    payment: 'Płatność',
    principal: 'Główna',
    interest: 'Odsetki',
    balance: 'Saldo',
    expandAll: 'Rozwiń Wszystkie Miesiące',
    principalVsInterest: 'Analiza Główna vs Odsetki',
    quickTerms: 'Szybór Okresu',
  },
  tr: {
    title: 'Kredi Hesaplayıcısı',
    loanAmount: 'Kredi Tutarı',
    interestRate: 'Yıllık Faiz Oranı (%)',
    loanTerm: 'Kredi Vadesi (Yıl)',
    downPayment: 'Peşinat',
    loanType: 'Kredi Türü',
    mortgage: 'Mortgage',
    auto: 'Otomobil Kredisi',
    personal: 'Kişisel Kredi',
    student: 'Öğrenci Kredisi',
    calculate: 'Hesapla',
    monthlyPayment: 'Aylık Ödeme',
    totalPayment: 'Toplam Ödeme',
    totalInterest: 'Toplam Faiz',
    ltvRatio: 'Kredi-Değer Oranı',
    amortizationSchedule: 'Amortisman Tablosu (İlk 12 Ay)',
    month: 'Ay',
    payment: 'Ödeme',
    principal: 'Anapara',
    interest: 'Faiz',
    balance: 'Bakiye',
    expandAll: 'Tüm Ayları Genişlet',
    principalVsInterest: 'Anapara vs Faiz Analizi',
    quickTerms: 'Hızlı Vade Seçimi',
  },
  vi: {
    title: 'Máy Tính Khoản Vay',
    loanAmount: 'Số Tiền Vay',
    interestRate: 'Lãi Suất Hàng Năm (%)',
    loanTerm: 'Thời Hạn Vay (Năm)',
    downPayment: 'Tiền Trả Trước',
    loanType: 'Loại Vay',
    mortgage: 'Thế Chấp',
    auto: 'Vay Ô Tô',
    personal: 'Vay Cá Nhân',
    student: 'Vay Học Tập',
    calculate: 'Tính Toán',
    monthlyPayment: 'Khoản Thanh Toán Hàng Tháng',
    totalPayment: 'Tổng Thanh Toán',
    totalInterest: 'Tổng Lãi',
    ltvRatio: 'Tỷ Lệ Giá Trị Vay',
    amortizationSchedule: 'Bảng Khấu Hao (12 Tháng Đầu)',
    month: 'Tháng',
    payment: 'Thanh Toán',
    principal: 'Tiền Gốc',
    interest: 'Lãi',
    balance: 'Số Dư',
    expandAll: 'Mở Rộng Tất Cả Tháng',
    principalVsInterest: 'Phân Tích Tiền Gốc vs Lãi',
    quickTerms: 'Chọn Nhanh Thời Hạn',
  },
  th: {
    title: 'เครื่องคิดเลขสินเชื่อ',
    loanAmount: 'จำนวนเงินกู้',
    interestRate: 'อัตราดอกเบี้ยรายปี (%)',
    loanTerm: 'ระยะเวลาสินเชื่อ (ปี)',
    downPayment: 'เงินดาวน์',
    loanType: 'ประเภทสินเชื่อ',
    mortgage: 'สินเชื่อที่อยู่อาศัย',
    auto: 'สินเชื่อรถยนต์',
    personal: 'สินเชื่อส่วนบุคคล',
    student: 'สินเชื่อนักเรียน',
    calculate: 'คำนวณ',
    monthlyPayment: 'ชำระเดือนละ',
    totalPayment: 'ชำระเงินทั้งสิ้น',
    totalInterest: 'ดอกเบี้ยทั้งสิ้น',
    ltvRatio: 'อัตราส่วน LTV',
    amortizationSchedule: 'ตารางการตัดจำหน่าย (12 เดือนแรก)',
    month: 'เดือน',
    payment: 'ชำระเงิน',
    principal: 'เงินต้น',
    interest: 'ดอกเบี้ย',
    balance: 'ยอดคงเหลือ',
    expandAll: 'ขยายทุกเดือน',
    principalVsInterest: 'การวิเคราะห์เงินต้นเทียบกับดอกเบี้ย',
    quickTerms: 'เลือกระยะเวลาอย่างรวดเร็ว',
  },
  sv: {
    title: 'Lånekalkylator',
    loanAmount: 'Lånebelopp',
    interestRate: 'Årlig Ränta (%)',
    loanTerm: 'Lånetid (År)',
    downPayment: 'Handpenning',
    loanType: 'Lånetyp',
    mortgage: 'Bostadslån',
    auto: 'Billån',
    personal: 'Personligt lån',
    student: 'Studielån',
    calculate: 'Beräkna',
    monthlyPayment: 'Månatlig Betalning',
    totalPayment: 'Total Betalning',
    totalInterest: 'Total Ränta',
    ltvRatio: 'Belåningsgrad',
    amortizationSchedule: 'Amorteringsplan (första 12 månader)',
    month: 'Månad',
    payment: 'Betalning',
    principal: 'Kapital',
    interest: 'Ränta',
    balance: 'Saldo',
    expandAll: 'Expandera Alla Månader',
    principalVsInterest: 'Analys av Kapital vs Ränta',
    quickTerms: 'Snabb Tidslängdval',
  },
  da: {
    title: 'Lånekalkulator',
    loanAmount: 'Lånebeløb',
    interestRate: 'Årlig Rentesats (%)',
    loanTerm: 'Lånetid (År)',
    downPayment: 'Handepenge',
    loanType: 'Lånetype',
    mortgage: 'Realkreditlån',
    auto: 'Billån',
    personal: 'Personligt lån',
    student: 'Studielån',
    calculate: 'Beregn',
    monthlyPayment: 'Månedlig Betaling',
    totalPayment: 'Total Betaling',
    totalInterest: 'Samlede Renter',
    ltvRatio: 'Belåningsgrad',
    amortizationSchedule: 'Amortiseringsplan (første 12 måneder)',
    month: 'Måned',
    payment: 'Betaling',
    principal: 'Hovedstol',
    interest: 'Rente',
    balance: 'Saldo',
    expandAll: 'Udvid Alle Måneder',
    principalVsInterest: 'Analyse af Hovedstol vs Rente',
    quickTerms: 'Hurtig Valg af Lånetid',
  },
  no: {
    title: 'Lånekalkulator',
    loanAmount: 'Lånebeløp',
    interestRate: 'Årlig Rente (%)',
    loanTerm: 'Lånetid (År)',
    downPayment: 'Nedbetalingsprinsipper',
    loanType: 'Lånetype',
    mortgage: 'Pantelån',
    auto: 'Billån',
    personal: 'Personlig lån',
    student: 'Studielån',
    calculate: 'Beregn',
    monthlyPayment: 'Månedlig Betaling',
    totalPayment: 'Total Betaling',
    totalInterest: 'Totale Renter',
    ltvRatio: 'Låneverdi Forhold',
    amortizationSchedule: 'Amortiseringsplan (første 12 måneder)',
    month: 'Måned',
    payment: 'Betaling',
    principal: 'Hovedstol',
    interest: 'Rente',
    balance: 'Saldo',
    expandAll: 'Utvid Alle Måneder',
    principalVsInterest: 'Analyse av Hovedstol vs Rente',
    quickTerms: 'Hurtig Tidsvalg',
  },
};

export default function Calculator() {
  const [lang, setLang] = useState<string>('en');
  const [state, setState] = useState<CalculatorState>({
    loanAmount: 300000,
    interestRate: 5.5,
    loanTerm: 30,
    loanType: 'mortgage',
    downPayment: 60000,
  });
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    ltvRatio: number;
    amortization: AmortizationRow[];
  } | null>(null);
  const [expandedAmortization, setExpandedAmortization] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('loanCalcState');
    const savedLang = localStorage.getItem('loanCalcLang');
    if (saved) setState(JSON.parse(saved));
    if (savedLang) setLang(savedLang);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('loanCalcState', JSON.stringify(state));
    localStorage.setItem('loanCalcLang', lang);
  }, [state, lang]);

  const calculateLoan = () => {
    const principal = state.loanAmount - state.downPayment;
    const monthlyRate = state.interestRate / 100 / 12;
    const numberOfPayments = state.loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numberOfPayments;
      const totalPayment = principal;
      const totalInterest = 0;
      const ltvRatio = (principal / state.loanAmount) * 100;

      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest,
        ltvRatio,
        amortization: generateAmortization(principal, monthlyRate, numberOfPayments),
      });
      return;
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const ltvRatio = (principal / state.loanAmount) * 100;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      ltvRatio,
      amortization: generateAmortization(principal, monthlyRate, numberOfPayments),
    });
  };

  const generateAmortization = (
    principal: number,
    monthlyRate: number,
    numberOfPayments: number
  ): AmortizationRow[] => {
    const schedule: AmortizationRow[] = [];
    let balance = principal;

    const monthlyPayment =
      monthlyRate === 0
        ? principal / numberOfPayments
        : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    return schedule;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'de-DE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const setLoanTerm = (years: number) => {
    setState({ ...state, loanTerm: years });
  };

  const principalTotal = results?.amortization.reduce((sum, row) => sum + row.principal, 0) || 0;
  const interestTotal = results?.amortization.reduce((sum, row) => sum + row.interest, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="card space-y-6">
          <h2 className="text-2xl font-bold text-accent">{t.title}</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.loanAmount}
            </label>
            <input
              type="number"
              value={state.loanAmount}
              onChange={(e) => setState({ ...state, loanAmount: parseFloat(e.target.value) || 0 })}
              className="tool-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.downPayment}
            </label>
            <input
              type="number"
              value={state.downPayment}
              onChange={(e) => setState({ ...state, downPayment: parseFloat(e.target.value) || 0 })}
              className="tool-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.interestRate}
            </label>
            <input
              type="number"
              step="0.01"
              value={state.interestRate}
              onChange={(e) => setState({ ...state, interestRate: parseFloat(e.target.value) || 0 })}
              className="tool-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.loanTerm}
            </label>
            <input
              type="number"
              value={state.loanTerm}
              onChange={(e) => setState({ ...state, loanTerm: parseFloat(e.target.value) || 0 })}
              className="tool-input mb-3"
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="text-xs font-semibold text-gray-400 col-span-3 mb-1">{t.quickTerms}:</div>
              {[5, 10, 15, 20, 25, 30].map((years) => (
                <button
                  key={years}
                  onClick={() => setLoanTerm(years)}
                  className={`py-2 px-3 text-sm font-bold rounded-lg transition-all ${
                    state.loanTerm === years
                      ? 'bg-accent text-white'
                      : 'bg-white/[0.04] text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {years}y
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.loanType}
            </label>
            <select
              value={state.loanType}
              onChange={(e) => setState({ ...state, loanType: e.target.value as CalculatorState['loanType'] })}
              className="tool-input"
            >
              <option value="mortgage">{t.mortgage}</option>
              <option value="auto">{t.auto}</option>
              <option value="personal">{t.personal}</option>
              <option value="student">{t.student}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {t.language}
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="tool-input"
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="ar">العربية</option>
              <option value="hi">हिन्दी</option>
              <option value="it">Italiano</option>
              <option value="nl">Nederlands</option>
              <option value="pl">Polski</option>
              <option value="tr">Türkçe</option>
              <option value="vi">Tiếng Việt</option>
              <option value="th">ไทย</option>
              <option value="sv">Svenska</option>
              <option value="da">Dansk</option>
              <option value="no">Norsk</option>
            </select>
          </div>

          <button onClick={calculateLoan} className="btn-primary w-full text-lg">
            {t.calculate}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Results</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{t.monthlyPayment}</p>
                  <p className="tool-result text-3xl">{formatCurrency(results.monthlyPayment)}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">{t.totalPayment}</p>
                    <p className="text-lg font-bold text-accent">
                      {formatCurrency(results.totalPayment)}
                    </p>
                  </div>
                  <div className="bg-white/[0.02] rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">{t.totalInterest}</p>
                    <p className="text-lg font-bold text-red-500">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                </div>
                <div className="bg-white/[0.02] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">{t.ltvRatio}</p>
                  <p className="text-lg font-bold text-accent">{results.ltvRatio.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            {/* Principal vs Interest Breakdown */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">{t.principalVsInterest}</h3>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-accent h-full flex items-center justify-end pr-2"
                  style={{ width: `${(principalTotal / (principalTotal + interestTotal)) * 100}%` }}
                >
                  <span className="text-xs font-bold text-white">
                    {((principalTotal / (principalTotal + interestTotal)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm mt-3">
                <div>
                  <p className="text-gray-400">Principal</p>
                  <p className="font-bold text-accent">{formatCurrency(principalTotal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Interest</p>
                  <p className="font-bold text-red-500">{formatCurrency(interestTotal)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Amortization Schedule */}
      {results && (
        <div className="mt-12 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-300">{t.amortizationSchedule}</h3>
            <button
              onClick={() => setExpandedAmortization(!expandedAmortization)}
              className="px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/10 rounded-lg"
            >
              {expandedAmortization ? 'Show First 12' : t.expandAll}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">{t.month}</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">{t.payment}</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">{t.principal}</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">{t.interest}</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">{t.balance}</th>
                </tr>
              </thead>
              <tbody>
                {(expandedAmortization ? results.amortization : results.amortization.slice(0, 12)).map(
                  (row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-gray-300">{row.month}</td>
                      <td className="px-4 py-3 text-right text-gray-300">
                        {formatCurrency(row.payment)}
                      </td>
                      <td className="px-4 py-3 text-right text-accent font-semibold">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="px-4 py-3 text-right text-red-500 font-semibold">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300 font-semibold">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

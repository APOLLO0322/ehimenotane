import Image from "next/image";

export default function ConceptSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image
          src="/footerback.JPG"
          alt="愛媛の風景"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center">
        {/* ロゴプレースホルダー（後で画像に差し替え） */}
        <p className="text-stone-400 text-sm tracking-[0.3em] mb-8">
          ヒメタネロゴ
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-stone-800 leading-relaxed mb-6">
          毎日のいいこと、毎日の楽しいことを発信
          <br />
          昨日よりもちょっとしあわせな愛媛を
        </h2>

        <p className="text-sm text-stone-600 leading-loose max-w-lg mx-auto">
          昨日よりもちょっとしあわせな愛媛で暮らすためのウェブサイトです。昨日よりもちょっと幸せな愛媛になりますように、そんな思いを込めて毎日のいいこと、毎日の楽しいことを配信します。地元がもっと好きになるはず！
        </p>
      </div>
    </section>
  );
}

// @ts-nocheck
import {formatDate} from '../../journal';

export default function JournalCard({a, featured = false, eager = false, headingLevel = 3}) {
  const H = `h${headingLevel}`;
  const href = `/journal/${a.slug}`;
  return (
    <article className={`group relative flex flex-col ${featured ? 'lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center' : ''}`}>
      <a href={href} className={`block overflow-hidden bg-[#1a1815] ${featured ? 'lg:col-span-7' : ''}`} tabIndex={-1} aria-hidden="true">
        <img
          src={a.cover.replace('w=1600', featured ? 'w=1600' : 'w=900')}
          alt=""
          width={featured ? 1600 : 900}
          height={featured ? 900 : 506}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager ? {fetchPriority: 'high'} : {})}
          className="block w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </a>
      <div className={`${featured ? 'lg:col-span-5 mt-6 lg:mt-0' : 'mt-5'}`}>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C9A24A] m-0">
          {a.category} <span aria-hidden="true">·</span> {a.readingMinutes} min read
        </p>
        <H className={`font-serif font-normal text-[#F4EFE2] leading-[1.08] mt-3 mb-3 ${featured ? 'text-[34px] sm:text-[44px]' : 'text-[26px] sm:text-[28px]'}`}>
          <a href={href} className="hover:text-[#E7C878] transition-colors">{a.title}</a>
        </H>
        <p className="j-sans text-[15px] text-[#F4EFE2]/75 leading-relaxed m-0">{a.description}</p>
        <p className="j-sans text-[13px] text-[#F4EFE2]/65 mt-4 m-0">
          By Miguel Perez <span aria-hidden="true">·</span> <time dateTime={a.date}>{formatDate(a.date)}</time>
        </p>
      </div>
    </article>
  );
}

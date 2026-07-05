'use client';

import { useState } from 'react';
import { Facebook, Linkedin, MessageCircle, Link2, Check, Instagram, Youtube } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-brand-blue hover:text-white"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
      </button>
      <button
        onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-brand-blue hover:text-white"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </button>
      <button
        onClick={() => openShare(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-green-500 hover:text-white"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={16} />
      </button>
      <span
        title="Instagram doesn't support direct web links — copy the link and paste it into your Instagram bio or story"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400"
      >
        <Instagram size={16} />
      </span>
      <span
        title="Paste this link into your YouTube video description"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400"
      >
        <Youtube size={16} />
      </span>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-brand-navy hover:border-brand-blue hover:text-brand-blue"
      >
        {copied ? <Check size={13} /> : <Link2 size={13} />}
        {copied ? 'Link Copied' : 'Copy Link'}
      </button>
    </div>
  );
}

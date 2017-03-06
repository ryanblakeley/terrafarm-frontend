import React from 'react';
import Layout from 'shared/components/Layout';
import {H2, H4, P, A} from 'shared/components/Typography';

const emailLink = <A href={'mailto:info@terra.farm'}>email</A>;
const ryanLink = <A href={'http://rojobuffalo.com'}>Ryan Blakeley</A>;
const stackshareLink = <A href={'https://stackshare.io/terrafarm/terrafarm'}>Stackshare</A>;
const snippetLink = <A href={'https://terra.farm/snippets/csa'}>snippet</A>;
const terrafarmLink = <A href={'https://terra.farm'}>Terrafarm</A>;
const blogLink = <A href={'https://terra.farm/blog'}>blog</A>;
const wikiLink = <A href={'https://terra.farm/wiki'}>wiki</A>;
const calebLink = <A href={'http://calebmer.com'}>@calebmer</A>;
const g2iLink = <A href={'http://www.g2idev.com/'}>G2i</A>;
const darinLink = <A href={'https://github.com/dphaener'}>@dphaener</A>;


const AboutPage = () => <Layout smallPage>
  <H2>About</H2>
  <P>This {snippetLink} explains the CSA concept in more detail.</P>
  <H4>Company</H4>
  <P>{terrafarmLink}&rsquo;s mission is to build positive food systems.</P>
  <H4>Content Library</H4>
  <P>A {blogLink} and {wikiLink} companion site.</P>
  <H4>Contact</H4>
  <P>If you have any questions or feedback, please reach out via {emailLink}.</P>
  <H4>Technical</H4>
  <P>Check out the Terrafarm CSA software stack on {stackshareLink}.</P>
  <H4>Acknowledgements</H4>
  <P>
    Special thanks to {calebLink}, {darinLink}, and {g2iLink} for their
    contributions to the code base.
  </P>
  <P>
    Barn icon created by Ron Scott from the Noun Project. Wheat icon created by
    anbileru adaleru from the Noun Project.
  </P>
  <H4>Built and owned by</H4>
  <P>{ryanLink}</P>
</Layout>;

export default AboutPage;

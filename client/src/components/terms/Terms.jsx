/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import style from "./Terms.module.css";

export function Terms() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.pageContent}>
        <div className={style.content}>
          <h1 className={style.title}>IMDb Conditions of Use</h1>
          <p className={style.termsP}>
            Welcome to IMDb. IMDb.com, Inc. and/or its affiliates ("IMDb")
            provide its website features and other services to you subject to
            the following conditions.
            <strong>
              If you visit IMDb.com, use other IMDb services, products, or use
              software or mobile applications provided by IMDb that states that
              it is subject to these Conditions of Use (collectively “IMDb
              Services”), you accept these conditions.
            </strong>
            Please read them carefully. In addition, when you use any current,
            future IMDb Services, (e.g., IMDbPro.com) you also will be subject
            to the guidelines, terms and agreements (“Terms”) applicable to that
            IMDb Service. If these Conditions of Use are inconsistent with the
            Terms provided for any IMDb service, the Terms will control.
          </p>
          <h3 className={style.yellowHeader}>Privacy</h3>
          <p className={style.termsP}>
            Please review our Privacy Notice, which also governs your use of any
            IMDb Service, to understand our practices.
          </p>
          <h3 className={style.yellowHeader}>Electronic Communications</h3>
          <p className={style.termsP}>
            When you use any IMDb Service or send e-mails to us, you are
            communicating with us electronically. You consent to receive
            communications from us electronically. We will communicate with you
            by e-mail or by posting notices on this site or through the other
            IMDb Services. You agree that all agreements, notices, disclosures
            and other communications that we provide to you electronically
            satisfy any legal requirement that such communications be in
            writing.
          </p>
          <h3 className={style.yellowHeader}>Copyright</h3>
          <p className={style.termsP}>
            All content included on this site in or made available through any
            IMDb Service, such as text, graphics, logos, button icons, images,
            audio clips, video clips, digital downloads, data compilations, and
            software, is the property of IMDb or its content suppliers and
            protected by United States and international copyright laws. The
            compilation of all content included in or made available through any
            IMDb Service is the exclusive property of IMDb and protected by U.S.
            and international copyright laws. All software used in any IMDb
            Service is the property of IMDb or its software suppliers and
            protected by United States and international copyright laws.
          </p>
          <h3 className={style.yellowHeader}>Trademarks</h3>
          <p className={style.termsP}>
            IMDb and STARMETER are registered trademarks, and the IMDb logo,
            IMDbPRO, MOVIEMETER, and other marks indicated in any IMDb Services
            are trademarks of IMDb in the United States and/or other countries.
            Other IMDb graphics, logos, page headers, button icons, scripts, and
            service names are trademarks or trade dress of IMDb. IMDb's
            trademarks and trade dress may not be used in connection with any
            product or service that is not IMDb's, in any manner that is likely
            to cause confusion among customers, or in any manner that disparages
            or discredits IMDb. All other trademarks not owned by IMDb that
            appear on this site or in any IMDb Service are the property of their
            respective owners, who may or may not be affiliated with, connected
            to, or sponsored by IMDb.
          </p>
          <h3 className={style.yellowHeader}>License and Site Access</h3>
          <p className={style.termsP}>
            Subject to your compliance with these Conditions of Use and your
            payment of any applicable fees, IMDb or its content providers grants
            you a limited, non-exclusive, non-transferable, non-sublicenseable
            license to access and make personal and non-commercial use of the
            IMDb Services, including digital content available through the IMDb
            Services, and not to download (other than page caching) or modify
            this site, or any portion of it, except with express written consent
            of IMDb. Additional license terms may be found in the Terms. The
            IMDb Services or any portion of such services may not be reproduced,
            duplicated, copied, sold, resold, visited, or otherwise exploited
            for any commercial purpose without express written consent of IMDb.
            This license does not include any resale or commercial use of any
            IMDb Service or its contents or any derivative use of this site or
            its contents. All licenses are non-exclusive and all rights not
            expressly granted to you in these Conditions of Use or any
            applicable Terms are reserved and retained by IMDb or its licensors,
            suppliers, publishers, rightsholders, or other content providers.
            You will use all IMDb Services in compliance with all applicable
            laws.
          </p>
          <p className={style.termsP}>
            <strong>Robots and Screen Scraping:</strong> You may not use data
            mining, robots, screen scraping, or similar data gathering and
            extraction tools on this site, except with our express written
            consent as noted below.
          </p>
          <p className={style.termsP}>
            <strong>Framing:</strong> You may not frame or utilize framing
            techniques to enclose any trademark, logo, or other proprietary
            information (including images, text, page layout, or form) of IMDb
            without express written consent.
          </p>
          <p className={style.termsP}>
            <strong>Meta Tags:</strong> You may not use any meta tags or any
            other "hidden text" utilizing IMDb's name or trademarks without the
            express written consent of IMDb. Any unauthorized use terminates the
            permission or license granted by IMDb.
          </p>
          <p className={style.termsP}>
            <strong>
              Licensing IMDb Content; Consent to Use Robots and Crawlers:
            </strong>
            If you are interested in receiving our express written permission to
            use IMDb content for your non-personal (including commercial) use,
            please visit our Content Licensing section or contact our Licensing
            Department. We do allow the limited use of robots and crawlers, such
            as those from certain search engines, with our express written
            consent. If you are interested in receiving our express written
            permission to use robots or crawlers on our site, please contact our
            Licensing Department.
          </p>
          <p className={style.termsP}>
            <strong>Linking to IMDb.com:</strong>
            You are granted a limited, revocable, and nonexclusive right to
            create a hyperlink to IMDb.com so long as the link follows our
            linking guide and does not portray IMDb, its services in a false,
            misleading, derogatory, or otherwise offensive matter. You may not
            use any IMDb logo or other proprietary graphic or trademark as part
            of the link without express written permission except as outlined in
            our help section.
          </p>
          <h3 className={style.yellowHeader}>Your Account</h3>
          <p className={style.termsP}>
            If you use any IMDb Service, you are responsible for maintaining the
            confidentiality of log-in information and for restricting access to
            your computer, and you agree to accept responsibility for all
            activities that occur under your account or password. IMDb reserves
            the right to refuse service, terminate accounts, or remove or edit
            content in its sole discretion.
          </p>
          <h3 className={style.yellowHeader}>
            Reviews, Comments, Communications, and Other Content
          </h3>
          <p className={style.termsP}>
            Visitors may post reviews, comments, and other content; and submit
            suggestions, ideas, comments, questions, or other information, so
            long as the content is not illegal, obscene, threatening,
            defamatory, invasive of privacy, infringing of intellectual property
            rights, or otherwise injurious to third parties or objectionable, is
            not created by generative AI, and does not consist of or contain
            software viruses, political campaigning, commercial solicitation,
            chain letters, mass mailings, or any form of "spam." You may not use
            a false e-mail address, impersonate any person or entity, or
            otherwise mislead as to the origin of your content. IMDb reserves
            the right (but not the obligation) to remove or edit such content,
            but does not regularly review posted content.
          </p>
          <p className={style.termsP}>
            <strong>Your License to IMDb:</strong> If you do post content or
            submit material, and unless we indicate otherwise, you grant IMDb a
            nonexclusive, royalty-free, perpetual, irrevocable, and fully
            sublicensable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such content throughout the world in any media. You grant IMDb and
            its sublicensees the right to use the name that you submit in
            connection with such content, if they choose. You represent and
            warrant that you own or otherwise control all of the rights to the
            content that you post; that the content is accurate; that use of the
            content you supply does not violate this policy and will not cause
            injury to any person or entity; and that you will indemnify IMDb for
            all claims resulting from content you supply. IMDb has the right but
            not the obligation to monitor and edit or remove any activity or
            content. IMDb takes no responsibility and assumes no liability for
            any content posted by you or any third party. If you would like to
            learn more about how we handle content that you submit, please
            review our Privacy Notice.
          </p>
          <h3 className={style.yellowHeader}>Copyright Complaints</h3>
          <p className={style.termsP}>
            IMDb respects the intellectual property of others. If you believe
            that your work has been copied in a way that constitutes copyright
            infringement, please provide IMDb's copyright agent the written
            information specified below. Please note that this procedure is
            exclusively for notifying IMDb and its affiliates that your
            copyrighted material has been infringed.
          </p>
          <ul className={style.listContainer}>
            <li className={style.list}>
              An electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright interest;
            </li>
            <li className={style.list}>
              A description of the copyrighted work that you claim has been
              infringed upon;
            </li>
            <li className={style.list}>
              A description of where the material that you claim is infringing
              is located on the site;
            </li>
            <li className={style.list}>
              Your address, telephone number, and e-mail address;
            </li>
            <li className={style.list}>
              A statement by you that you have a good-faith belief that the
              disputed use is not authorized by the copyright owner, its agent,
              or the law;
            </li>
            <li className={style.list}>
              A statement by you, made under penalty of perjury, that the above
              information in your notice is accurate and that you are the
              copyright owner or authorized to act on the copyright owner's
              behalf.
            </li>
          </ul>
        </div>
        <a href="#" className={style.top}>
          Back to Top &#8593;
        </a>
      </div>
    </div>
  );
}

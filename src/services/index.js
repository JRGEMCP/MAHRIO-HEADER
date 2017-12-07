import { OauthSessionService } from './oauth-session.service';
import { AccessControlService } from './accesscontrol.service';
import { NotificationService } from './notification.service';
import { ArticleService } from './article.service';
import { ArticleFavoriteService } from './article-favorites.service';
import { GithubService } from './github.service';
import { SectionService } from './article-section.service';
import { SocketService } from './socket.service';
import { PaginationService } from './pagination.service';
import { MediaService } from './media.service';
import { ClipboardService } from './clipboard.service';

export {
  OauthSessionService,
  AccessControlService,
  NotificationService,
  ArticleService,
  ArticleFavoriteService,
  GithubService,
  SectionService,
  SocketService,
  PaginationService,
  MediaService,
  ClipboardService,
};

export const Services = [
  OauthSessionService,
  AccessControlService,
  NotificationService,
  ArticleService,
  ArticleFavoriteService,
  GithubService,
  SectionService,
  SocketService,
  PaginationService,
  MediaService,
  ClipboardService,
];
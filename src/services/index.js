import { OauthSessionService } from './oauth-session.service';
import { NotificationService } from './notification.service';
import { ArticleService } from './article.service';
import { SocketService } from './socket.service';
import { PaginationService } from './pagination.service';

export {
  OauthSessionService,
  NotificationService,
  ArticleService,
  SocketService,
  PaginationService,
};

export const Services = [
  OauthSessionService,
  NotificationService,
  ArticleService,
  SocketService,
  PaginationService,
];
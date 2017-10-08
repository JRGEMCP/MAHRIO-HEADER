import { OauthSessionService } from './oauth-session.service';
import { AccessControlService } from './accesscontrol.service';
import { NotificationService } from './notification.service';
import { ArticleService } from './article.service';
import { SocketService } from './socket.service';
import { PaginationService } from './pagination.service';

export {
  OauthSessionService,
  AccessControlService,
  NotificationService,
  ArticleService,
  SocketService,
  PaginationService,
};

export const Services = [
  OauthSessionService,
  AccessControlService,
  NotificationService,
  ArticleService,
  SocketService,
  PaginationService,
];